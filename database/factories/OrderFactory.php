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
            'customer_id' => Customer::inRandomOrder()->first()->id ?? Customer::factory(),
            'order_date' => $this->faker->dateTimeBetween('2024-01-01', '2025-12-31')->format('Y-m-d'),
            'total_price' => 0, // Will be updated later in OrderProductSeeder
            'quantity' => 0, // Will be updated later in OrderProductSeeder
            'status' => $this->faker->randomElement(['Pending', 'Processing', 'Delivered']),
            'is_deleted' => false,
        ];
    }
}
