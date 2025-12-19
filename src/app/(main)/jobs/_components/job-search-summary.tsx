'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  jobSearchSummary,
  type JobSearchSummaryInput,
} from '@/ai/flows/job-search-summary';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const FormSchema = z.object({
  skills: z.string().min(1, 'Skills are required.'),
  location: z.string().min(1, 'Location is required.'),
});

type FormData = z.infer<typeof FormSchema>;

export function JobSearchSummary() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setSummary('');
    try {
      const result = await jobSearchSummary(data as JobSearchSummaryInput);
      setSummary(result.summary);
    } catch (error) {
      console.error(error);
      setSummary('Failed to generate job summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Search Summary</CardTitle>
        <CardDescription>Get an AI-powered summary of jobs matching your profile.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skills">Your Skills</Label>
            <Input id="skills" {...register('skills')} placeholder="e.g., Driving, Customer Service, Logistics" />
            {errors.skills && <p className="text-sm text-destructive">{errors.skills.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Your Location</Label>
            <Input id="location" {...register('location')} placeholder="e.g., San Francisco, CA" />
            {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Summary
          </Button>
          {summary && (
            <div className="w-full p-4 bg-muted rounded-lg text-sm whitespace-pre-wrap">
              {summary}
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
