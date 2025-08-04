<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
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
            'project_id' => 'nullable|exists:projects,id',
            'customer_id' => 'nullable|exists:customers,id',
            'lead_id' => 'nullable|exists:leads,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,completed,cancelled',
            'priority' => 'required|in:low,medium,high,urgent',
            'due_date' => 'nullable|date',
            'reminder_date' => 'nullable|date|before_or_equal:due_date',
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
            'project_id.exists' => 'Selected project does not exist.',
            'customer_id.exists' => 'Selected customer does not exist.',
            'lead_id.exists' => 'Selected lead does not exist.',
            'title.required' => 'Task title is required.',
            'status.required' => 'Task status is required.',
            'status.in' => 'Invalid task status selected.',
            'priority.required' => 'Priority is required.',
            'priority.in' => 'Invalid priority selected.',
            'reminder_date.before_or_equal' => 'Reminder date must be before or equal to due date.',
        ];
    }
}