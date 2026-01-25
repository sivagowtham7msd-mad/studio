'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const FormSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required.'),
  companyName: z.string().min(1, 'Company name is required.'),
  location: z.string().min(1, 'Location is required.'),
  availability: z.string().min(1, 'Number of available positions is required.'),
  description: z.string().min(1, 'Job description is required.'),
});

type FormData = z.infer<typeof FormSchema>;

export function PostJobForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    // Here you would typically send the data to your backend/database
    console.log('New job posted:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    toast({
      title: 'Job Posted!',
      description: `The job "${data.jobTitle}" has been successfully posted.`,
    });
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a New Job Opening</CardTitle>
        <CardDescription>Fill out the form below to post a new job. This will be visible to people searching for jobs.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input id="jobTitle" {...register('jobTitle')} placeholder="e.g., Delivery Driver" />
              {errors.jobTitle && <p className="text-sm text-destructive">{errors.jobTitle.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" {...register('companyName')} placeholder="e.g., CivicConnect" />
              {errors.companyName && <p className="text-sm text-destructive">{errors.companyName.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Company's Location</Label>
              <Input id="location" {...register('location')} placeholder="e.g., Chennai, TN" />
              {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">Number of Job Availability</Label>
              <Input id="availability" type="number" {...register('availability')} placeholder="e.g., 5" />
              {errors.availability && <p className="text-sm text-destructive">{errors.availability.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea id="description" {...register('description')} placeholder="Describe the job responsibilities, requirements, etc." />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Post Job
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
