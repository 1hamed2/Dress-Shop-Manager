<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;


class ImportItemResources extends JsonResource
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
            'import' => $this -> import ? new ImportResources($this->import) : null,
            'product' => $this -> product ? new ProductResources($this->product) : null,
            'quantity' => $this->quantity,
            'cost_per_unit' => $this->cost_per_unit,
            'total_cost' => $this->total_cost,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
