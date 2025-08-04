import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Props {
    canLogin: boolean;
    canRegister: boolean;
    [key: string]: unknown;
}

export default function Welcome({ canLogin, canRegister }: Props) {
    const features = [
        {
            icon: '🎯',
            title: 'Lead Management',
            description: 'Track and nurture leads through your sales pipeline with automated follow-ups.',
            stats: 'Convert 40% more leads'
        },
        {
            icon: '👥',
            title: 'Customer Relations',
            description: 'Maintain detailed customer profiles and interaction history in one place.',
            stats: 'Increase retention by 25%'
        },
        {
            icon: '📊',
            title: 'Project Tracking',
            description: 'Manage projects from start to finish with progress tracking and deadlines.',
            stats: 'Complete projects 30% faster'
        },
        {
            icon: '✅',
            title: 'Task & Reminders',
            description: 'Never miss important tasks with smart reminders and priority management.',
            stats: 'Stay 100% organized'
        }
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Sales Manager',
            company: 'TechCorp',
            quote: 'This CRM transformed how we manage our sales pipeline. Lead conversion is up 45%!'
        },
        {
            name: 'Mike Chen',
            role: 'Business Owner',
            company: 'Creative Agency',
            quote: 'Finally, a CRM that doesn\'t overcomplicate things. Perfect for small businesses.'
        }
    ];

    return (
        <>
            <Head title="Personal CRM - Manage Your Business Relationships" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
                {/* Navigation */}
                <nav className="relative mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <div className="text-2xl">🤝</div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">PersonalCRM</span>
                    </div>
                    
                    {(canLogin || canRegister) && (
                        <div className="flex items-center gap-4">
                            {canLogin && (
                                <Link
                                    href="/login"
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                                >
                                    Sign In
                                </Link>
                            )}
                            {canRegister && (
                                <Button asChild>
                                    <Link href="/register">
                                        Get Started Free
                                    </Link>
                                </Button>
                            )}
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                                🤝 Personal CRM
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                The simple, powerful CRM that helps you manage leads, customers, and projects. 
                                Build stronger relationships and grow your business with intelligent task management and reminders.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                {canRegister && (
                                    <Button size="lg" asChild className="px-8 py-3 text-lg">
                                        <Link href="/register">
                                            Start Free Trial
                                        </Link>
                                    </Button>
                                )}
                                {canLogin && (
                                    <Button variant="outline" size="lg" asChild className="px-8 py-3 text-lg">
                                        <Link href="/login">
                                            Sign In
                                        </Link>
                                    </Button>
                                )}
                            </div>
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                ✨ No credit card required • 14-day free trial • Cancel anytime
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Everything you need to manage your business
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Streamline your workflow with our comprehensive CRM solution
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base mb-4">
                                        {feature.description}
                                    </CardDescription>
                                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        {feature.stats}
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Dashboard Preview */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Beautiful, intuitive dashboard
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Get insights at a glance with our clean, organized interface
                        </p>
                    </div>

                    <div className="relative">
                        <div className="mx-auto max-w-4xl">
                            <div className="rounded-xl bg-white dark:bg-gray-800 p-8 shadow-2xl">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Stats Cards */}
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardDescription>Active Leads</CardDescription>
                                            <CardTitle className="text-2xl">127</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-xs text-muted-foreground">
                                                <span className="text-green-600">↗️ +12%</span> from last month
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardDescription>Active Projects</CardDescription>
                                            <CardTitle className="text-2xl">23</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-xs text-muted-foreground">
                                                <span className="text-green-600">↗️ +8%</span> from last month
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardDescription>Tasks Due Today</CardDescription>
                                            <CardTitle className="text-2xl">5</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-xs text-muted-foreground">
                                                📅 2 overdue
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="mt-8 text-center">
                                    <Badge variant="outline" className="px-4 py-2">
                                        📊 Real-time Analytics • 🔔 Smart Reminders • 📱 Mobile Ready
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 bg-white/50 dark:bg-gray-800/50 rounded-3xl mx-6">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Loved by business owners
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="p-6">
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-4">
                                        <div className="text-2xl">👤</div>
                                        <div>
                                            <blockquote className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                                "{testimonial.quote}"
                                            </blockquote>
                                            <div>
                                                <div className="font-semibold">{testimonial.name}</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {testimonial.role} at {testimonial.company}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Ready to transform your business?
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Join thousands of business owners who use PersonalCRM to grow their relationships and increase revenue.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {canRegister && (
                                <Button size="lg" asChild className="px-8 py-3 text-lg">
                                    <Link href="/register">
                                        🚀 Start Your Free Trial
                                    </Link>
                                </Button>
                            )}
                            {canLogin && (
                                <Button variant="outline" size="lg" asChild className="px-8 py-3 text-lg">
                                    <Link href="/login">
                                        Sign In
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t border-gray-200 dark:border-gray-700">
                    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <div className="text-2xl">🤝</div>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">PersonalCRM</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                © 2024 PersonalCRM. Built with ❤️ for growing businesses.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}