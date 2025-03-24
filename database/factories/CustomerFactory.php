<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
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
            'name' => $this->faker->name(),
            'address' => $this->faker->address(),
            'contact_number' => $this->faker->numerify('09#########'),
            'email' => $this->faker->unique()->safeEmail(),
            'is_deleted' => false,
        ];
    }
}
