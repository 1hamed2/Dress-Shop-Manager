<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Staff;


class StaffCommission extends Model
{
    protected $fillable = ['staff_id', 'month', 'total_commission'];

    public function staff()
    {
        return $this->belongsTo(Staff::class, 'staff_id');
    }
}
