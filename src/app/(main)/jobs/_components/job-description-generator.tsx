'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  generateJobDescription,
  type JobDescriptionInput,
} from '@/ai/flows/job-description-generator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const FormSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required.'),
  companyName: z.string().min(1, 'Company name is required.'),
  keywords: z.string().min(1, 'Keywords are required.'),
});

type FormData = z.infer<typeof FormSchema>;

export function JobDescriptionGenerator() {
  const [generatedDescription, setGeneratedDescription] = useState('');
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
    setGeneratedDescription('');
    try {
      const result = await generateJobDescription(data as JobDescriptionInput);
      setGeneratedDescription(result.jobDescription);
    } catch (error) {
      console.error(error);
      setGeneratedDescription('Failed to generate job description. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Description Generator</CardTitle>
        <CardDescription>Generate a compelling job description using AI.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input id="jobTitle" {...register('jobTitle')} placeholder="e.g., Software Engineer" />
            {errors.jobTitle && <p className="text-sm text-destructive">{errors.jobTitle.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" {...register('companyName')} placeholder="e.g., StreetVerse Inc." />
            {errors.companyName && <p className="text-sm text-destructive">{errors.companyName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input id="keywords" {...register('keywords')} placeholder="e.g., React, TypeScript, Remote" />
            {errors.keywords && <p className="text-sm text-destructive">{errors.keywords.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Description
          </Button>
          {generatedDescription && (
            <div className="w-full p-4 bg-muted rounded-lg text-sm whitespace-pre-wrap">
              {generatedDescription}
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
