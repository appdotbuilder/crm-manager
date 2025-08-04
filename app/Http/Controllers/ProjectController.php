<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Customer;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Project::where('user_id', $request->user()->id)
            ->with('customer')
            ->latest();

        // Apply filters
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        if ($request->filled('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $projects = $query->paginate(15)->withQueryString();

        // Get customers for filter dropdown
        $customers = Customer::where('user_id', $request->user()->id)
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return Inertia::render('projects/index', [
            'projects' => $projects,
            'customers' => $customers,
            'filters' => $request->only(['status', 'priority', 'customer_id', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $customers = Customer::where('user_id', auth()->id())
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return Inertia::render('projects/create', [
            'customers' => $customers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $project = Project::create([
            'user_id' => $request->user()->id,
            ...$request->validated(),
        ]);

        return redirect()->route('projects.show', $project)
            ->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        // Ensure user can only view their own projects
        if ($project->user_id !== auth()->id()) {
            abort(403);
        }

        $project->load([
            'customer',
            'tasks' => function ($query) {
                $query->latest();
            }
        ]);

        return Inertia::render('projects/show', [
            'project' => $project,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        // Ensure user can only edit their own projects
        if ($project->user_id !== auth()->id()) {
            abort(403);
        }

        $customers = Customer::where('user_id', auth()->id())
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return Inertia::render('projects/edit', [
            'project' => $project,
            'customers' => $customers,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        // Ensure user can only edit their own projects
        if ($project->user_id !== auth()->id()) {
            abort(403);
        }

        $project->update($request->validated());

        return redirect()->route('projects.show', $project)
            ->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        // Ensure user can only delete their own projects
        if ($project->user_id !== auth()->id()) {
            abort(403);
        }

        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project deleted successfully.');
    }
}