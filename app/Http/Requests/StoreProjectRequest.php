<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
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
            'customer_id' => 'nullable|exists:customers,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:planning,active,on_hold,completed,cancelled',
            'priority' => 'required|in:low,medium,high,urgent',
            'budget' => 'nullable|numeric|min:0',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'progress' => 'integer|min:0|max:100',
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
            'customer_id.exists' => 'Selected customer does not exist.',
            'name.required' => 'Project name is required.',
            'status.required' => 'Project status is required.',
            'status.in' => 'Invalid project status selected.',
            'priority.required' => 'Priority is required.',
            'priority.in' => 'Invalid priority selected.',
            'budget.numeric' => 'Budget must be a number.',
            'budget.min' => 'Budget cannot be negative.',
            'end_date.after_or_equal' => 'End date must be after or equal to start date.',
            'progress.integer' => 'Progress must be a whole number.',
            'progress.min' => 'Progress cannot be less than 0%.',
            'progress.max' => 'Progress cannot be more than 100%.',
        ];
    }
}