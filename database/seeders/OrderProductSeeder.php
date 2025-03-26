<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orders = Order::all();

        foreach ($orders as $order) {
            // Get random products (each order will have 1-3 products)
            $products = Product::inRandomOrder()->take(rand(1, 3))->get();

            $totalPrice = 0;

            foreach ($products as $product) {
                $quantity = rand(1, 5); // Random quantity
                $priceAtOrder = $product->price; // Get current product price

                // Insert into pivot table
                DB::table('order_product')->insert([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price_at_order' => $priceAtOrder,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                // Calculate total price for the order
                $totalPrice += $priceAtOrder * $quantity;
            }

            // Update the order's total price
            $order->update(['total_price' => $totalPrice]);
        }
    }
}
