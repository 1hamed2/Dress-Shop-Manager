<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Sale;
use App\Models\StaffCommission;


class Staff extends Model
{
    /** @use HasFactory<\Database\Factories\StaffFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
    ];

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

    public function commissions()
    {
        return $this->hasMany(StaffCommission::class, 'staff_id');
    }
}
