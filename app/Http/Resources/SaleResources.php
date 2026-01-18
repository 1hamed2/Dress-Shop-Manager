<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;


class SaleResources extends JsonResource
{

    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product' => $this -> product ? new ProductResources($this->product) : null,
            'staff' => $this -> staff ? new StaffResources($this->staff) : null,
            'quantity' => $this->quantity,
            'price_per_unit' => $this->price_per_unit,
            'total_price' => $this->total_price,
            'commission' => $this->commission,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),

        ];
    }
}
