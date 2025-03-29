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
