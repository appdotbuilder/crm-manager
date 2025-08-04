<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:leads,email',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'status' => 'required|in:new,contacted,qualified,lost,converted',
            'priority' => 'required|in:low,medium,high',
            'value' => 'nullable|numeric|min:0',
            'follow_up_date' => 'nullable|date|after_or_equal:today',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Lead name is required.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email is already registered as a lead.',
            'status.required' => 'Lead status is required.',
            'status.in' => 'Invalid lead status selected.',
            'priority.required' => 'Priority is required.',
            'priority.in' => 'Invalid priority selected.',
            'value.numeric' => 'Lead value must be a number.',
            'value.min' => 'Lead value cannot be negative.',
            'follow_up_date.after_or_equal' => 'Follow-up date cannot be in the past.',
        ];
    }
}