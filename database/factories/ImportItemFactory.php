<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use App\Models\Import;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Import_item>
 */
class ImportItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
   public function definition(): array
    {
        // Pick a random product; if none exists, create one
        $product = Product::inRandomOrder()->first() ?? Product::factory()->create();

        // Pick a random import; if none exists, create one
        $import = Import::inRandomOrder()->first() ?? Import::factory()->create();

        $quantity = fake()->numberBetween(5, 30);
        $costPerUnit = fake()->numberBetween(3000, 40000);
        $totalCost = $quantity * $costPerUnit;

        // ✅ Increase product stock when seeding
        $product->increment('stock', $quantity);

        return [
            'import_id' => $import->id,
            'product_id' => $product->id,
            'quantity' => $quantity,
            'cost_per_unit' => $costPerUnit,
            'total_cost' => $totalCost,
        ];
    }
}
