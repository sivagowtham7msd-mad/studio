'use server';

/**
 * @fileOverview A job search summary AI agent.
 *
 * - jobSearchSummary - A function that provides a summary of available jobs tailored to a user's skills and location.
 * - JobSearchSummaryInput - The input type for the jobSearchSummary function.
 * - JobSearchSummaryOutput - The return type for the jobSearchSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobSearchSummaryInputSchema = z.object({
  skills: z.string().describe('A comma-separated list of the user\'s skills.'),
  location: z.string().describe('The user\'s location.'),
});
export type JobSearchSummaryInput = z.infer<typeof JobSearchSummaryInputSchema>;

const JobSearchSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of available jobs tailored to the user\'s skills and location.'),
});
export type JobSearchSummaryOutput = z.infer<typeof JobSearchSummaryOutputSchema>;

export async function jobSearchSummary(input: JobSearchSummaryInput): Promise<JobSearchSummaryOutput> {
  return jobSearchSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobSearchSummaryPrompt',
  input: {schema: JobSearchSummaryInputSchema},
  output: {schema: JobSearchSummaryOutputSchema},
  prompt: `You are a helpful AI assistant that provides a summary of available jobs based on a user's skills and location.\n\nSkills: {{{skills}}}\nLocation: {{{location}}}\n\nSummary: `,
});

const jobSearchSummaryFlow = ai.defineFlow(
  {
    name: 'jobSearchSummaryFlow',
    inputSchema: JobSearchSummaryInputSchema,
    outputSchema: JobSearchSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
