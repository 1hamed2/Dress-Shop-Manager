<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Company;
use App\Models\Product;
use App\Models\Staff;
use App\Models\Import;
use App\Models\ImportItem;
use App\Models\Sale;
use App\Models\Expense;
use App\Models\SystemSetting;


                                                    
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Test',
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        SystemSetting::factory()->create([
            'commission_per_piece' => 20,
        ]);

        Company::factory()->count(5)->create();

        Product::factory()->count(30)->create();

        // 4️⃣ Staff
        Staff::factory()->count(6)->create();

        Import::factory()->count(5)->create();

        // Each import gets 5–10 products randomly
        Import::all()->each(function ($import) {
            ImportItem::factory()
                ->count(fake()->numberBetween(5, 10))
                ->for($import) // associate with this import
                ->create();
        });

        // Generate sales only from products that have stock
        for ($i = 0; $i < 40; $i++) {
            // Skip iteration if no product has stock
            if (Product::where('stock', '>', 0)->count() === 0) break;

            Sale::factory()->create();
        }

        Expense::factory()->count(5)->create();



        // ✅ Sanity check: ensure no negative stock
        Product::all()->each(function ($product) {
            if ($product->stock < 0) {
                $product->update(['stock' => 0]);
            }
        });
    }

}
