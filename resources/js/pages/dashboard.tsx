import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Stats {
    leads: {
        total: number;
        new: number;
        qualified: number;
        converted: number;
    };
    customers: {
        total: number;
        active: number;
    };
    projects: {
        total: number;
        active: number;
        completed: number;
    };
    tasks: {
        total: number;
        pending: number;
        overdue: number;
        due_today: number;
    };
}

interface Lead {
    id: number;
    name: string;
    email: string;
    status: string;
    priority: string;
    value?: number;
    created_at: string;
}

interface Task {
    id: number;
    title: string;
    status: string;
    priority: string;
    due_date?: string;
    project?: { name: string };
    customer?: { name: string };
    lead?: { name: string };
}

interface Props {
    stats: Stats;
    recentLeads: Lead[];
    recentTasks: Task[];
    upcomingTasks: Task[];
    followUpLeads: Lead[];
    [key: string]: unknown;
}

export default function Dashboard({ 
    stats, 
    recentLeads, 
    recentTasks, 
    upcomingTasks, 
    followUpLeads 
}: Props) {
    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            qualified: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            converted: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            lost: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            pending: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
            in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    };

    const getPriorityColor = (priority: string) => {
        const colors: Record<string, string> = {
            low: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
            medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
            urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        };
        return colors[priority] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    };

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="space-y-8">
                {/* Welcome Section */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        🤝 Welcome to your CRM Dashboard
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Here's what's happening with your business today.
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                            <div className="text-2xl">🎯</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.leads.total}</div>
                            <div className="flex gap-2 mt-2">
                                <Badge variant="secondary" className="text-xs">
                                    {stats.leads.new} new
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                    {stats.leads.qualified} qualified
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                            <div className="text-2xl">👥</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.customers.active}</div>
                            <p className="text-xs text-muted-foreground">
                                of {stats.customers.total} total customers
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                            <div className="text-2xl">📊</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.projects.active}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.projects.completed} completed
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
                            <div className="text-2xl">✅</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.tasks.pending}</div>
                            <div className="flex gap-2 mt-2">
                                {stats.tasks.overdue > 0 && (
                                    <Badge variant="destructive" className="text-xs">
                                        {stats.tasks.overdue} overdue
                                    </Badge>
                                )}
                                {stats.tasks.due_today > 0 && (
                                    <Badge variant="secondary" className="text-xs">
                                        {stats.tasks.due_today} due today
                                    </Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>⚡ Quick Actions</CardTitle>
                        <CardDescription>Common tasks to keep your business moving</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild>
                                <Link href="/leads/create">
                                    🎯 Add New Lead
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/customers/create">
                                    👥 Add Customer
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/projects/create">
                                    📊 Create Project
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/tasks/create">
                                    ✅ Add Task
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Leads */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>🎯 Recent Leads</CardTitle>
                                <CardDescription>Your latest prospects</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/leads">View All</Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentLeads.length > 0 ? (
                                    recentLeads.map((lead) => (
                                        <div key={lead.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <Link
                                                    href={`/leads/${lead.id}`}
                                                    className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
                                                >
                                                    {lead.name}
                                                </Link>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</p>
                                                {lead.value && (
                                                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                                        ${lead.value.toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <Badge className={getStatusColor(lead.status)}>
                                                    {lead.status}
                                                </Badge>
                                                <Badge variant="outline" className={getPriorityColor(lead.priority)}>
                                                    {lead.priority}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                        No leads yet. <Link href="/leads/create" className="text-blue-600 hover:underline">Add your first lead</Link>
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Tasks */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>⏰ Upcoming Tasks</CardTitle>
                                <CardDescription>Tasks due soon</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/tasks">View All</Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {upcomingTasks.length > 0 ? (
                                    upcomingTasks.map((task) => (
                                        <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <Link
                                                    href={`/tasks/${task.id}`}
                                                    className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
                                                >
                                                    {task.title}
                                                </Link>
                                                {(task.project || task.customer || task.lead) && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {task.project?.name || task.customer?.name || task.lead?.name}
                                                    </p>
                                                )}
                                                {task.due_date && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Due: {new Date(task.due_date).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <Badge className={getStatusColor(task.status)}>
                                                    {task.status.replace('_', ' ')}
                                                </Badge>
                                                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                                                    {task.priority}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                        No upcoming tasks. <Link href="/tasks/create" className="text-blue-600 hover:underline">Create a task</Link>
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Tasks */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>📋 Recent Tasks</CardTitle>
                            <CardDescription>Your latest task activity</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/tasks">View All</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentTasks.length > 0 ? (
                                recentTasks.map((task) => (
                                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <Link
                                                href={`/tasks/${task.id}`}
                                                className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
                                            >
                                                {task.title}
                                            </Link>
                                            {(task.project || task.customer || task.lead) && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {task.project?.name || task.customer?.name || task.lead?.name}
                                                </p>
                                            )}
                                            {task.due_date && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Due: {new Date(task.due_date).toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <Badge className={getStatusColor(task.status)}>
                                                {task.status.replace('_', ' ')}
                                            </Badge>
                                            <Badge variant="outline" className={getPriorityColor(task.priority)}>
                                                {task.priority}
                                            </Badge>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                    No recent tasks. <Link href="/tasks/create" className="text-blue-600 hover:underline">Create a task</Link>
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Follow-up Leads */}
                {followUpLeads.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>🔔 Leads Needing Follow-up</CardTitle>
                            <CardDescription>These leads are ready for your attention</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {followUpLeads.map((lead) => (
                                    <div key={lead.id} className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                                        <Link
                                            href={`/leads/${lead.id}`}
                                            className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
                                        >
                                            {lead.name}
                                        </Link>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</p>
                                        <div className="flex gap-2 mt-2">
                                            <Badge className={getStatusColor(lead.status)}>
                                                {lead.status}
                                            </Badge>
                                            <Badge variant="outline" className={getPriorityColor(lead.priority)}>
                                                {lead.priority}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}