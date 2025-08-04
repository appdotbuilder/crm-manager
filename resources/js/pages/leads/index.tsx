import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Lead {
    id: number;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    status: string;
    priority: string;
    value?: number;
    follow_up_date?: string;
    created_at: string;
}

interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

interface PaginatedLeads {
    data: Lead[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLinks;
}

interface Filters {
    status?: string;
    priority?: string;
    search?: string;
}

interface Props {
    leads: PaginatedLeads;
    filters?: Filters;
    [key: string]: unknown;
}

export default function LeadsIndex({ leads, filters }: Props) {
    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            qualified: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            converted: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            lost: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    };

    const getPriorityColor = (priority: string) => {
        const colors: Record<string, string> = {
            low: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
            medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        };
        return colors[priority] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get('/leads', {
            ...filters,
            [key]: value || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppShell>
            <Head title="Leads" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            🎯 Leads
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Manage your sales prospects and opportunities
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/leads/create">
                            ➕ Add New Lead
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">🔍 Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Search</label>
                                <Input
                                    placeholder="Name, email, or company..."
                                    value={filters?.search || ''}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Status</label>
                                <Select value={filters?.status || ''} onValueChange={(value) => handleFilterChange('status', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All statuses</SelectItem>
                                        <SelectItem value="new">New</SelectItem>
                                        <SelectItem value="contacted">Contacted</SelectItem>
                                        <SelectItem value="qualified">Qualified</SelectItem>
                                        <SelectItem value="converted">Converted</SelectItem>
                                        <SelectItem value="lost">Lost</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Priority</label>
                                <Select value={filters?.priority || ''} onValueChange={(value) => handleFilterChange('priority', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All priorities" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All priorities</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Leads List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {leads.data.map((lead) => (
                        <Card key={lead.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">
                                            <Link 
                                                href={`/leads/${lead.id}`}
                                                className="hover:text-blue-600 dark:hover:text-blue-400"
                                            >
                                                {lead.name}
                                            </Link>
                                        </CardTitle>
                                        <CardDescription>{lead.email}</CardDescription>
                                        {lead.company && (
                                            <CardDescription className="mt-1">
                                                🏢 {lead.company}
                                            </CardDescription>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Badge className={getStatusColor(lead.status)}>
                                            {lead.status}
                                        </Badge>
                                        <Badge variant="outline" className={getPriorityColor(lead.priority)}>
                                            {lead.priority}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {lead.phone && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            📞 {lead.phone}
                                        </p>
                                    )}
                                    {lead.value && (
                                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                                            💰 ${lead.value.toLocaleString()}
                                        </p>
                                    )}
                                    {lead.follow_up_date && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            📅 Follow up: {new Date(lead.follow_up_date).toLocaleDateString()}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Created: {new Date(lead.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Button size="sm" variant="outline" asChild>
                                        <Link href={`/leads/${lead.id}`}>
                                            👁️ View
                                        </Link>
                                    </Button>
                                    <Button size="sm" variant="outline" asChild>
                                        <Link href={`/leads/${lead.id}/edit`}>
                                            ✏️ Edit
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {leads.data.length === 0 && (
                    <Card>
                        <CardContent className="text-center py-16">
                            <div className="text-6xl mb-4">🎯</div>
                            <h3 className="text-lg font-semibold mb-2">No leads found</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Start building your sales pipeline by adding your first lead.
                            </p>
                            <Button asChild>
                                <Link href="/leads/create">
                                    ➕ Add Your First Lead
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {leads.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Showing {((leads.current_page - 1) * leads.per_page) + 1} to {Math.min(leads.current_page * leads.per_page, leads.total)} of {leads.total} leads
                        </p>
                        <div className="flex gap-2">
                            {leads.links.prev && (
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={leads.links.prev}>← Previous</Link>
                                </Button>
                            )}
                            <span className="flex items-center px-3 py-2 text-sm">
                                Page {leads.current_page} of {leads.last_page}
                            </span>
                            {leads.links.next && (
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={leads.links.next}>Next →</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}