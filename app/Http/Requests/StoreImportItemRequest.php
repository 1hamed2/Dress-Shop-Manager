<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreImportItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'import_id' => 'required|exists:imports,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'cost_per_unit' => 'required|numeric|min:500',
        ];
    }
}
