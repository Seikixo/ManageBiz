<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'product_id' => Product::inRandomOrder()->first()->id ?? Product::factory(),
            'customer_id' => Customer::inRandomOrder()->first()->id ?? Customer::factory(),
            'order_date' => $this->faker->date(),
            'total_price' => $this->faker->randomFloat(2, 100, 5000),
            'quantity' => $this->faker->numberBetween(1, 10),
            'status' => $this->faker->randomElement(['Pending', 'Processing', 'Delivered']),
            'is_deleted' => false,
        ];
    }
}
