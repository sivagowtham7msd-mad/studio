'use client';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobDescriptionGenerator } from "./_components/job-description-generator";
import { JobSearchSummary } from "./_components/job-search-summary";
import { jobs as allJobs, type Job } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Separator } from '@/components/ui/separator';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(allJobs);
  const [location, setLocation] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(allJobs);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = () => {
    if (location.trim() === '') {
      setFilteredJobs(jobs);
    } else {
      const lowerCaseLocation = location.toLowerCase();
      const results = jobs.filter(job => 
        job.location.toLowerCase().includes(lowerCaseLocation)
      );
      setFilteredJobs(results);
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          toast({
            title: "Location Found!",
            description: `Using your current location to find jobs.`,
          });
          // In a real app, you would use a geocoding service to convert lat/lon to a location name.
          // For this demo, we'll just show a success message.
        },
        (error) => {
          toast({
            variant: "destructive",
            title: "Could not get location",
            description: "Please ensure you have granted location permissions in your browser.",
          });
          console.error("Geolocation error:", error);
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation.",
      });
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">CivicConnect Job Finder</h1>
        <p className="text-muted-foreground">Discover opportunities and use AI tools to get ahead.</p>
      </div>
      <Tabs defaultValue="listings" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="listings">Job Listings</TabsTrigger>
          <TabsTrigger value="tools">AI Job Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="listings" className="mt-6">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold font-headline">Current Openings</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline"><Search className="mr-2 h-4 w-4"/>Find Jobs</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Find Jobs by Location</DialogTitle>
                    <DialogDescription>Enter a state or district to find jobs near you, or use your current location.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="location-search" className="text-right">
                        Location
                      </Label>
                      <Input
                        id="location-search"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="col-span-3"
                        placeholder="e.g., Chennai or Tamil Nadu"
                      />
                    </div>
                    <div className="relative my-2">
                      <Separator />
                      <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-background px-2 text-xs text-muted-foreground">OR</span>
                    </div>
                     <Button variant="outline" onClick={handleUseMyLocation}>
                      <MapPin className="mr-2 h-4 w-4" />
                      Use My Current Location
                    </Button>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSearch}>Search</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            {filteredJobs.map((job) => (
              <Card key={job.id} className="transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
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
             {filteredJobs.length === 0 && (
              <p className="text-muted-foreground text-center">No jobs found for the specified location.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="tools" className="mt-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <JobSearchSummary />
            <JobDescriptionGenerator />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
