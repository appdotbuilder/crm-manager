<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Customer>
     */
    protected $model = Customer::class;

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
            'address' => fake()->optional()->address(),
            'notes' => fake()->optional()->paragraph(),
            'status' => fake()->randomElement(['active', 'inactive', 'prospect']),
            'lifetime_value' => fake()->randomFloat(2, 0, 100000),
            'last_contact_date' => fake()->optional()->dateTimeBetween('-1 year', 'now'),
        ];
    }

    /**
     * Indicate that the customer is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the customer is a prospect.
     */
    public function prospect(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'prospect',
        ]);
    }
}