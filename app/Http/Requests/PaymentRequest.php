<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
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
            'order_id' => 'required|exists:orders,id',
            'customer_id' => 'required|exists:customers,id',
            'payment_date' => 'required|date',
            'payment_amount' => 'required|numeric|min:0',
            'payment_status' => 'required|string|in:Paid,Pending,Refund,Failed',
            'payment_type' => 'required|string|in:Cash,Gcash,"Credit Card", "Bank Transfer"'
        ];
    }
}
