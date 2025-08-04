<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Lead;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Task>
     */
    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $hasDueDate = fake()->boolean(70);
        $dueDate = $hasDueDate ? fake()->dateTimeBetween('-1 month', '+2 months') : null;
        $reminderDate = $hasDueDate && fake()->boolean(60) ? fake()->dateTimeBetween('-1 month', $dueDate) : null;
        $status = fake()->randomElement(['pending', 'in_progress', 'completed', 'cancelled']);
        $completedAt = $status === 'completed' ? fake()->dateTimeBetween('-1 month', 'now') : null;

        return [
            'user_id' => User::factory(),
            'project_id' => fake()->boolean(30) ? Project::factory() : null,
            'customer_id' => fake()->boolean(40) ? Customer::factory() : null,
            'lead_id' => fake()->boolean(30) ? Lead::factory() : null,
            'title' => fake()->sentence(4),
            'description' => fake()->optional()->paragraph(),
            'status' => $status,
            'priority' => fake()->randomElement(['low', 'medium', 'high', 'urgent']),
            'due_date' => $dueDate,
            'reminder_date' => $reminderDate,
            'reminder_sent' => false,
            'completed_at' => $completedAt,
        ];
    }

    /**
     * Indicate that the task is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'completed_at' => null,
        ]);
    }

    /**
     * Indicate that the task is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'completed_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ]);
    }

    /**
     * Indicate that the task is overdue.
     */
    public function overdue(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'due_date' => fake()->dateTimeBetween('-1 month', '-1 day'),
            'completed_at' => null,
        ]);
    }
}