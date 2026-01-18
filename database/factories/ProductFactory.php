<?php

namespace Database\Factories;

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
        return [
            'company_id' => \App\Models\Company::inRandomOrder()->first()->id,
            'name' => fake()->name(),
            'cost_price' => fake()->numberBetween(3000, 50000),
            'sale_price' => fake()->numberBetween(3000, 50000),
            'stock' => fake()->numberBetween(0, 30),
        ];
    }
}
