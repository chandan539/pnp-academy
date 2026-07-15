import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">PnP Academy Author Onboarding</CardTitle>
          <CardDescription>
            Welcome! Please complete the onboarding form to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8">
            {['Personal Details', 'Nominee', 'Bank Info', 'Identity Docs', 'Book Details', 'Agreement'].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {index + 1}
                </div>
                <span className="text-xs mt-2 text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
          <Separator className="mb-6" />

          {/* Form Content - Step 1: Personal Details (Placeholder) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input id="mobile" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <button className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">Previous</button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition">Next Step</button>
        </CardFooter>
      </Card>
    </div>
  );
}
