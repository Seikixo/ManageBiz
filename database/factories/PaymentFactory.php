<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => Order::inRandomOrder()->first()->id ?? Order::factory(),
            'customer_id' => Customer::inRandomOrder()->first()->id ?? Customer::factory(),
            'payment_date' => $this->faker->date(),
            'payment_amount' => $this->faker->randomFloat(2, 100, 5000),
            'payment_status' => $this->faker->randomElement(['Paid', 'Pending', 'Refund', 'Failed']),
            'payment_type' => $this->faker->randomElement(['Cash', 'Gcash', 'Credit Card', 'Bank Transfer']),
            'is_deleted' => false,
        ];
    }
}
