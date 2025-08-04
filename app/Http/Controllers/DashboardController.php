<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Lead;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get statistics
        $stats = [
            'leads' => [
                'total' => Lead::where('user_id', $user->id)->count(),
                'new' => Lead::where('user_id', $user->id)->where('status', 'new')->count(),
                'qualified' => Lead::where('user_id', $user->id)->where('status', 'qualified')->count(),
                'converted' => Lead::where('user_id', $user->id)->where('status', 'converted')->count(),
            ],
            'customers' => [
                'total' => Customer::where('user_id', $user->id)->count(),
                'active' => Customer::where('user_id', $user->id)->where('status', 'active')->count(),
            ],
            'projects' => [
                'total' => Project::where('user_id', $user->id)->count(),
                'active' => Project::where('user_id', $user->id)->where('status', 'active')->count(),
                'completed' => Project::where('user_id', $user->id)->where('status', 'completed')->count(),
            ],
            'tasks' => [
                'total' => Task::where('user_id', $user->id)->count(),
                'pending' => Task::where('user_id', $user->id)->where('status', 'pending')->count(),
                'overdue' => Task::where('user_id', $user->id)->overdue()->count(),
                'due_today' => Task::where('user_id', $user->id)->dueToday()->count(),
            ],
        ];

        // Get recent activities
        $recentLeads = Lead::where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();

        $recentTasks = Task::where('user_id', $user->id)
            ->with(['project', 'customer', 'lead'])
            ->latest()
            ->take(5)
            ->get();

        $upcomingTasks = Task::where('user_id', $user->id)
            ->with(['project', 'customer', 'lead'])
            ->pending()
            ->whereNotNull('due_date')
            ->orderBy('due_date')
            ->take(5)
            ->get();

        $followUpLeads = Lead::where('user_id', $user->id)
            ->needsFollowUp()
            ->orderBy('follow_up_date')
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentLeads' => $recentLeads,
            'recentTasks' => $recentTasks,
            'upcomingTasks' => $upcomingTasks,
            'followUpLeads' => $followUpLeads,
        ]);
    }
}