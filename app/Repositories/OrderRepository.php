<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderRepository
{
    public function findById($id)
    {
        return Order::with(['customer', 'products'])->findOrFail($id);
    }

    public function getOrderWithCustomer()
    {
        $orders = Order::with('customer')->get();
        return $orders;
    }

    public function createOrderWithProducts(array $data): Order
    {
        return DB::transaction(function () use ($data) {
            $products = collect($data['products']);

            // Fetch product prices
            $productPrices = Product::whereIn('id', $products->pluck('product_id'))
                ->pluck('price', 'id');

            if ($productPrices->count() !== $products->count()) {
                throw new \Exception("Some products are invalid or missing prices.");
            }

            // Calculate total price and quantity
            $totalPrice = 0;
            $totalQuantity = 0;
            $orderProducts = [];

            foreach ($products as $product) {
                $priceAtOrder = $productPrices[$product['product_id']];
                $quantity = $product['quantity'];

                $orderProducts[$product['product_id']] = [
                    'quantity' => $quantity,
                    'price_at_order' => $priceAtOrder,
                ];

                $totalPrice += $priceAtOrder * $quantity;
                $totalQuantity += $quantity;
            }

            // Create order
            $order = Order::create([
                'user_id' => Auth::id(),
                'customer_id' => $data['customer_id'],
                'order_date' => $data['order_date'],
                'status' => $data['status'],
                'total_price' => $totalPrice,
                'quantity' => $totalQuantity,
            ]);

            // Attach products
            $order->products()->attach($orderProducts);

            return $order;
        });
    }   

    public function updateOrder(int $orderId, array $data)
    {
        return DB::transaction(function () use ($orderId, $data) {
            $order = Order::findOrFail($orderId);
            
            // Update Order details
            $order->update([
                'customer_id' => $data['customer_id'],
                'order_date' => $data['order_date'],
                'status' => $data['status'],
            ]);

            // Sync products with quantity and price_at_order
            $order->products()->sync(
                collect($data['products'])->mapWithKeys(fn($product) => [
                    $product['product_id'] => [
                        'quantity' => $product['quantity'],
                        'price_at_order' => Product::find($product['product_id'])->price, // Ensure correct price
                    ]
                ])->toArray()
            );

            // Recalculate and update order total price
            $totalQuantity = $order->products->sum(fn($p) => $p->pivot->quantity);
            $totalPrice = $order->products->sum(fn($p) => $p->pivot->quantity * $p->pivot->price_at_order);
            $order->update([
                'quantity' => $totalQuantity,
                'total_price' => $totalPrice
            ]);

            return $order->fresh(); // Return updated order
        });
    }

    public function update($id, array $data)
    {
        $order = Order::findOrFail($id);
        $order->update($data);
        return $order;
    }

    public function softDelete($id)
    {
        $order = Order::findOrFail($id);     
        $order->update(['is_deleted' => true]);
        DB::table('order_product')
        ->where('order_id', $id)
        ->update(['is_deleted' => true]);
        
        return $order->fresh();
    }

    public function search(string $search, $perPage = 10): LengthAwarePaginator
    {
        return Order::with(['customer', 'products'])
        ->when($search, fn (Builder $query) => 
            $query->whereHas('customer', fn (Builder $subQuery) =>
                $subQuery->where('name', 'like', "%{$search}%")
           )
        )->latest()->paginate($perPage);
    }
}
