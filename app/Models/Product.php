<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Company;
use App\Models\ImportItem;
use App\Models\Sale;


class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'company_id',
        'name',
        'cost_price',
        'sale_price',
        'stock',
        
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function importItems()
    {
        return $this->hasMany(ImportItem::class);
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
}
