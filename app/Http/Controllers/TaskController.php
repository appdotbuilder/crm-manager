<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Customer;
use App\Models\Lead;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Task::where('user_id', $request->user()->id)
            ->with(['project', 'customer', 'lead'])
            ->latest();

        // Apply filters
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        if ($request->filled('project_id')) {
            $query->where('project_id', $request->project_id);
        }

        if ($request->filled('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $tasks = $query->paginate(15)->withQueryString();

        // Get related data for filters
        $projects = Project::where('user_id', $request->user()->id)
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        $customers = Customer::where('user_id', $request->user()->id)
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return Inertia::render('tasks/index', [
            'tasks' => $tasks,
            'projects' => $projects,
            'customers' => $customers,
            'filters' => $request->only(['status', 'priority', 'project_id', 'customer_id', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::where('user_id', auth()->id())
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        $customers = Customer::where('user_id', auth()->id())
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        $leads = Lead::where('user_id', auth()->id())
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return Inertia::render('tasks/create', [
            'projects' => $projects,
            'customers' => $customers,
            'leads' => $leads,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = Task::create([
            'user_id' => $request->user()->id,
            ...$request->validated(),
        ]);

        return redirect()->route('tasks.show', $task)
            ->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        // Ensure user can only view their own tasks
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        $task->load(['project', 'customer', 'lead']);

        return Inertia::render('tasks/show', [
            'task' => $task,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        // Ensure user can only edit their own tasks
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        $projects = Project::where('user_id', auth()->id())
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        $customers = Customer::where('user_id', auth()->id())
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        $leads = Lead::where('user_id', auth()->id())
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return Inertia::render('tasks/edit', [
            'task' => $task,
            'projects' => $projects,
            'customers' => $customers,
            'leads' => $leads,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        // Ensure user can only edit their own tasks
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        $data = $request->validated();

        // Set completed_at when status changes to completed
        if ($data['status'] === 'completed' && $task->status !== 'completed') {
            $data['completed_at'] = now();
        } elseif ($data['status'] !== 'completed') {
            $data['completed_at'] = null;
        }

        $task->update($data);

        return redirect()->route('tasks.show', $task)
            ->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        // Ensure user can only delete their own tasks
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        $task->delete();

        return redirect()->route('tasks.index')
            ->with('success', 'Task deleted successfully.');
    }
}