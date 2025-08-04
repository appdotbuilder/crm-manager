<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeadRequest;
use App\Http\Requests\UpdateLeadRequest;
use App\Models\Lead;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Lead::where('user_id', $request->user()->id)
            ->latest();

        // Apply filters
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%");
            });
        }

        $leads = $query->paginate(15)->withQueryString();

        return Inertia::render('leads/index', [
            'leads' => $leads,
            'filters' => $request->only(['status', 'priority', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('leads/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeadRequest $request)
    {
        $lead = Lead::create([
            'user_id' => $request->user()->id,
            ...$request->validated(),
        ]);

        return redirect()->route('leads.show', $lead)
            ->with('success', 'Lead created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Lead $lead)
    {
        // Ensure user can only view their own leads
        if ($lead->user_id !== auth()->id()) {
            abort(403);
        }

        $lead->load(['tasks' => function ($query) {
            $query->latest();
        }]);

        return Inertia::render('leads/show', [
            'lead' => $lead,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lead $lead)
    {
        // Ensure user can only edit their own leads
        if ($lead->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('leads/edit', [
            'lead' => $lead,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLeadRequest $request, Lead $lead)
    {
        // Ensure user can only update their own leads
        if ($lead->user_id !== auth()->id()) {
            abort(403);
        }

        $lead->update($request->validated());

        return redirect()->route('leads.show', $lead)
            ->with('success', 'Lead updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lead $lead)
    {
        // Ensure user can only delete their own leads
        if ($lead->user_id !== auth()->id()) {
            abort(403);
        }

        $lead->delete();

        return redirect()->route('leads.index')
            ->with('success', 'Lead deleted successfully.');
    }
}