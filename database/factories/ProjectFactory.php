<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Project>
     */
    protected $model = Project::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $hasStartDate = fake()->boolean(70);
        $startDate = $hasStartDate ? fake()->dateTimeBetween('-6 months', '+1 month') : null;
        $endDate = $hasStartDate && fake()->boolean(80) ? fake()->dateTimeBetween($startDate, '+1 year') : null;

        return [
            'user_id' => User::factory(),
            'customer_id' => fake()->boolean(60) ? Customer::factory() : null,
            'name' => fake()->words(3, true),
            'description' => fake()->optional()->paragraph(),
            'status' => fake()->randomElement(['planning', 'active', 'on_hold', 'completed', 'cancelled']),
            'priority' => fake()->randomElement(['low', 'medium', 'high', 'urgent']),
            'budget' => fake()->optional()->randomFloat(2, 1000, 500000),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'progress' => fake()->numberBetween(0, 100),
        ];
    }

    /**
     * Indicate that the project is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the project is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'progress' => 100,
        ]);
    }
}