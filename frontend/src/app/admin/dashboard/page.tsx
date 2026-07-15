import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AdminDashboardPage() {
  const kpis = [
    { title: "Total Authors", value: "1,245" },
    { title: "Today's Authors", value: "12" },
    { title: "Pending Authors", value: "48" },
    { title: "Completed Books", value: "312" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Overview of your author onboarding and pipeline.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">Settings</button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition">New Author</button>
          </div>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{kpi.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data Table Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Authors Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border h-64 flex items-center justify-center text-muted-foreground">
              [Data Table Component will render here]
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
