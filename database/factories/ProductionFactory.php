<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Production>
 */
class ProductionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $materialCost = $this->faker->randomFloat(2, 100, 1000);
        $productionCost = $this->faker->randomFloat(2, 500, 5000);
        
        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'product_id' => Product::inRandomOrder()->first()->id ?? Product::factory(),
            'quantity_produced' => $this->faker->numberBetween(10, 500),
            'production_date' => $this->faker->date(),
            'material_cost' => $this->faker->randomFloat(2, 100, 1000),
            'production_cost' => $this->faker->randomFloat(2, 500, 5000),
            'overall_cost' => $materialCost + $productionCost,
        ];
    }
}
