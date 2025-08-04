<?php

namespace Database\Factories;

use App\Models\Lead;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lead>
 */
class LeadFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Lead>
     */
    protected $model = Lead::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->optional()->phoneNumber(),
            'company' => fake()->optional()->company(),
            'notes' => fake()->optional()->paragraph(),
            'status' => fake()->randomElement(['new', 'contacted', 'qualified', 'lost', 'converted']),
            'priority' => fake()->randomElement(['low', 'medium', 'high']),
            'value' => fake()->optional()->randomFloat(2, 100, 50000),
            'follow_up_date' => fake()->optional()->dateTimeBetween('now', '+30 days'),
        ];
    }

    /**
     * Indicate that the lead is new.
     */
    public function newLead(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'new',
        ]);
    }

    /**
     * Indicate that the lead is qualified.
     */
    public function qualified(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'qualified',
        ]);
    }

    /**
     * Indicate that the lead is converted.
     */
    public function converted(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'converted',
        ]);
    }
}