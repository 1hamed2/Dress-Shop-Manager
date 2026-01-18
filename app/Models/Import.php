<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Company;
use App\Models\ImportItem;


class Import extends Model
{
    /** @use HasFactory<\Database\Factories\ImportFactory> */
    use HasFactory;

    protected $fillable = [
        'company_id',
        'total_cost',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function importItems()
    {
        return $this->hasMany(ImportItem::class);
    }
}
