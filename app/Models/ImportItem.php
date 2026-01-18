<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Import;
use App\Models\Product;


class ImportItem extends Model
{
    /** @use HasFactory<\Database\Factories\ImportItemFactory> */
    use HasFactory;

    protected $fillable = [
        'import_id',
        'product_id',       
        'quantity',
        'cost_per_unit',
        'total_cost',
    ];

    public function import()
    {
        return $this->belongsTo(Import::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }


    protected static function booted() 
    {
        // Before creating → calculate total_cost
        static::creating(function ($importItem) {
            $importItem->total_cost = $importItem->quantity * $importItem->cost_per_unit;
        });

        // After creating → increment product stock
        static::created(function ($importItem) {
            $importItem->product->increment('stock', $importItem->quantity);
        });

        // When quantity or cost_per_unit changes → adjust stock and recalculate total_cost
        static::updated(function ($importItem) {
            // Handle quantity change
            if ($importItem->isDirty('quantity')) {
                $original = $importItem->getOriginal('quantity');
                $diff = $importItem->quantity - $original;

                if ($diff > 0) {
                    $importItem->product->increment('stock', $diff);
                } elseif ($diff < 0) {
                    $importItem->product->decrement('stock', abs($diff));
                }

                // Recalculate total_cost
                $importItem->total_cost = $importItem->quantity * $importItem->cost_per_unit;
                $importItem->saveQuietly(); // avoid infinite loop
            }

            // Handle cost_per_unit change
            if ($importItem->isDirty('cost_per_unit')) {
                $importItem->total_cost = $importItem->quantity * $importItem->cost_per_unit;
                $importItem->saveQuietly();
            }
        });

        // When deleted → decrement stock
        static::deleted(function ($importItem) {
            $importItem->product->decrement('stock', $importItem->quantity);
        });
    }
}
