<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Lead;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CrmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a demo user if none exists
        $user = User::firstOrCreate(
            ['email' => 'demo@example.com'],
            [
                'name' => 'Demo User',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        // Create leads
        $leads = Lead::factory(15)->create(['user_id' => $user->id]);

        // Create customers
        $customers = Customer::factory(10)->create(['user_id' => $user->id]);

        // Create projects
        $projects = Project::factory(8)->create([
            'user_id' => $user->id,
            'customer_id' => $customers->random()->id,
        ]);

        // Create some projects without customers
        Project::factory(3)->create([
            'user_id' => $user->id,
            'customer_id' => null,
        ]);

        // Create tasks
        Task::factory(20)->create(['user_id' => $user->id]);

        // Create some tasks linked to projects
        Task::factory(15)->create([
            'user_id' => $user->id,
            'project_id' => $projects->random()->id,
        ]);

        // Create some tasks linked to customers
        Task::factory(10)->create([
            'user_id' => $user->id,
            'customer_id' => $customers->random()->id,
        ]);

        // Create some tasks linked to leads
        Task::factory(8)->create([
            'user_id' => $user->id,
            'lead_id' => $leads->random()->id,
        ]);

        // Create some overdue tasks
        Task::factory(5)->overdue()->create(['user_id' => $user->id]);

        // Create some completed tasks
        Task::factory(10)->completed()->create(['user_id' => $user->id]);
    }
}