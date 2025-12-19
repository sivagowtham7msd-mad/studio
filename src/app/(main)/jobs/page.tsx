import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobDescriptionGenerator } from "./_components/job-description-generator";
import { JobSearchSummary } from "./_components/job-search-summary";
import { jobs } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function JobsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Saviour Job Finder</h1>
        <p className="text-muted-foreground">Discover opportunities and use AI tools to get ahead.</p>
      </div>
      <Tabs defaultValue="tools" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tools">AI Job Tools</TabsTrigger>
          <TabsTrigger value="listings">Job Listings</TabsTrigger>
        </TabsList>
        <TabsContent value="tools" className="mt-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <JobSearchSummary />
            <JobDescriptionGenerator />
          </div>
        </TabsContent>
        <TabsContent value="listings" className="mt-6">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold font-headline">Current Openings</h2>
            {jobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription>{job.company} - {job.location}</CardDescription>
                    </div>
                    <Badge variant={job.type === 'Full-time' ? 'default' : 'secondary'}>{job.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{job.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">Posted {job.postedDate}</p>
                  <Button>Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
