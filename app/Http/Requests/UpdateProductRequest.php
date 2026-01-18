<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'company_id' => 'sometimes|exists:companies,id',
            'name' => 'sometimes|string|max:255',
            'cost_price' => 'sometimes|numeric|min:500',
            'sale_price' => 'sometimes|numeric|min:500',
            'stock' => 'sometimes|integer|min:0',
        ];
    }
}
