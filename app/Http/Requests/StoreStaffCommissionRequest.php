<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class StoreStaffCommissionRequest extends FormRequest
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
            'staff_id' => 'required|exists:staff,id',
            'month' => ['required','date', Rule::unique('staff_commissions')
                ->where(fn ($query) => 
                    $query->where('staff_id', $this->staff_id),)
            ],
            'total_commission' => 'required|numeric|min:0',
        ];
    }
}
