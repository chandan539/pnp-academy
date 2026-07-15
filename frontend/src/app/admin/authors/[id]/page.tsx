import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function AuthorProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">John Doe</h1>
            <p className="text-muted-foreground mt-1">Author ID: {params.id} • Status: <span className="text-yellow-600 font-medium">Pending Review</span></p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">Contact Author</button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition">Approve Onboarding</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Email</div>
                  <div className="font-medium">john.doe@example.com</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Mobile</div>
                  <div className="font-medium">+1 555-0192</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Address</div>
                  <div className="font-medium">123 Author Lane, Fiction City</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Company</div>
                  <div className="font-medium">Storytellers Inc.</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Book Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Title</div>
                  <div className="font-medium text-lg">The Great Adventure</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Category</div>
                  <div className="font-medium">Fiction / Fantasy</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Expected Timeline</div>
                  <div className="font-medium">6 Months</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tasks & Timeline */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Internal Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <div>
                      <div className="font-medium text-sm">Verify Bank Details</div>
                      <div className="text-xs text-muted-foreground">Assigned to: Finance Team</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <div>
                      <div className="font-medium text-sm">Review Identity Docs</div>
                      <div className="text-xs text-muted-foreground">Assigned to: Sales Manager</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pl-4 border-l border-gray-200 dark:border-gray-700 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900" />
                    <div className="text-sm font-medium">HubSpot Contact Created</div>
                    <div className="text-xs text-muted-foreground">2 hours ago</div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                    <div className="text-sm font-medium">Onboarding Form Submitted</div>
                    <div className="text-xs text-muted-foreground">3 hours ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
