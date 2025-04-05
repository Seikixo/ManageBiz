<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['bar', 'liquid', 'powder'];

        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'name' => $this->faker->unique()->word(),
            'description' => $this->faker->sentence(),
            'category' => $this->faker->randomElement($categories),
            'price' => $this->faker->randomFloat(2, 20, 200),
        ];
    }
}
