<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\SystemSettig;
use App\Models\Staff;


class Sale extends Model
{
    /** @use HasFactory<\Database\Factories\SaleFactory> */
    use HasFactory;

    protected $fillable = [
        'product_id',
        'staff_id',
        'quantity',
        'price_per_unit',
        'total_price',
        'commission',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    protected static function booted()
    {
        // Before creating a sale → calculate total_price and commission
        static::creating(function ($sale) {
            // Total amount = quantity * price_per_unit
            $sale->total_price = $sale->quantity * $sale->price_per_unit;

            // Commission from system settings
            $commissionRate = \App\Models\SystemSetting::first()?->commission_per_piece ?? 20;
            $sale->commission = $sale->quantity * $commissionRate;
        });

        // After creating a sale → decrement stock
        static::created(function ($sale) {
            $sale->product->decrement('stock', $sale->quantity);
        });

        // When sale quantity changes → adjust stock
        static::updating(function ($sale) {

            // Recalculate total and commission
            $sale->total_price = $sale->quantity * $sale->price_per_unit;

            $commissionRate = \App\Models\SystemSetting::first()?->commission_per_piece ?? 20;
            $sale->commission = $sale->quantity * $commissionRate;

            if ($sale->isDirty('quantity')) {
                $original = $sale->getOriginal('quantity');
                $diff = $sale->quantity - $original;

                // Decrement or increment depending on diff
                if ($diff > 0) {
                    $sale->product->decrement('stock', $diff);
                } elseif ($diff < 0) {
                    $sale->product->increment('stock', abs($diff));
                }
            }
        });

        // When sale deleted → restore stock
        static::deleted(function ($sale) {
            $sale->product->increment('stock', $sale->quantity);
        });
    }

}
