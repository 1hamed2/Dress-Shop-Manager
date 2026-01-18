<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use App\Models\Staff;
use App\Models\SystemSetting;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Pick a product that has stock available
        $product = Product::where('stock', '>', 0)->inRandomOrder()->first();

        // If no product with stock, create one with some stock
        if (!$product) {
            $product = Product::factory()->create(['stock' => fake()->numberBetween(10, 100)]);
        }

        // Pick a staff member (create one if none exist)
        $staff = Staff::inRandomOrder()->first() ?? Staff::factory()->create();

        // Set quantity — never more than product stock
        $maxQuantity = min($product->stock, fake()->numberBetween(1, 10));

        $pricePerUnit = fake()->numberBetween(3000, 40000);
        $commissionRate = SystemSetting::first()?->commission_per_piece ?? 20;

        $totalPrice = $maxQuantity * $pricePerUnit;
        $commission = $maxQuantity * $commissionRate;

        // ✅ Decrease product stock immediately
        $product->decrement('stock', $maxQuantity);

        return [
            'product_id' => $product->id,
            'staff_id' => $staff->id,
            'quantity' => $maxQuantity,
            'price_per_unit' => $pricePerUnit,
            'total_price' => $totalPrice,
            'commission' => $commission,
        ];
    }
}
