'use server';

/**
 * @fileOverview A job description generator AI agent.
 *
 * - generateJobDescription - A function that handles the job description generation process.
 * - JobDescriptionInput - The input type for the generateJobDescription function.
 * - JobDescriptionOutput - The return type for the generateJobDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobDescriptionInputSchema = z.object({
  keywords: z
    .string()
    .describe(
      'Keywords describing the job, separated by commas. Example: sales, marketing, remote'
    ),
  companyName: z.string().describe('The name of the company.'),
  jobTitle: z.string().describe('The title of the job.'),
});
export type JobDescriptionInput = z.infer<typeof JobDescriptionInputSchema>;

const JobDescriptionOutputSchema = z.object({
  jobDescription: z.string().describe('The generated job description.'),
});
export type JobDescriptionOutput = z.infer<typeof JobDescriptionOutputSchema>;

export async function generateJobDescription(
  input: JobDescriptionInput
): Promise<JobDescriptionOutput> {
  return generateJobDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobDescriptionPrompt',
  input: {schema: JobDescriptionInputSchema},
  output: {schema: JobDescriptionOutputSchema},
  prompt: `You are an expert recruiter specializing in writing job descriptions.

  You will use the following information to write a compelling job description for the company.

  Company Name: {{{companyName}}}
  Job Title: {{{jobTitle}}}
  Keywords: {{{keywords}}}

  Write a job description that is approximately 3 paragraphs long.
  Include a brief overview of the company, the responsibilities of the job, and the qualifications required.
  `,
});

const generateJobDescriptionFlow = ai.defineFlow(
  {
    name: 'generateJobDescriptionFlow',
    inputSchema: JobDescriptionInputSchema,
    outputSchema: JobDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
