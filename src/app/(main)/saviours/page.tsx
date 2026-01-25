'use client';
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { partners } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { PostJobForm } from "./_components/post-job-form";

function getImageUrl(id: string) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: 'https://picsum.photos/seed/placeholder/200/200', hint: 'placeholder logo' };
}

const indiaMapPlaceholder = getImageUrl('india-map');

export default function SavioursPage() {
  const medicinePartners = partners.filter(s => s.category === 'Medicine');
  const groceryPartners = partners.filter(s => s.category === 'Grocery');

  return (
    <div className="flex flex-col gap-8 animate-in fade-in-0 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Our Partners</h1>
        <p className="text-muted-foreground">Meet the partners who help us serve you across India.</p>
      </div>
      
      <Tabs defaultValue="partners" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="partners">Our Partners</TabsTrigger>
          <TabsTrigger value="post_job">Post a Job</TabsTrigger>
        </TabsList>
        <TabsContent value="partners" className="mt-6">
            <div className="flex flex-col gap-8">
                <Card>
                    <CardContent className="p-0 h-96">
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                            <Image
                            src={indiaMapPlaceholder.url}
                            alt="Map of India"
                            fill
                            className="object-cover"
                            data-ai-hint={indiaMapPlaceholder.hint}
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center flex-col text-white p-4 text-center">
                                <MapPin className="w-12 h-12 mb-4" />
                                <h3 className="text-xl font-bold">Serving Nationwide</h3>
                                <p>Our partners are available across the country.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Tabs defaultValue="medicine" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="medicine">Medicine Partners</TabsTrigger>
                    <TabsTrigger value="grocery">Grocery Partners</TabsTrigger>
                    </TabsList>
                    <TabsContent value="medicine" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {medicinePartners.map((partner) => {
                        const { url, hint } = getImageUrl(partner.logo);
                        return (
                            <Card key={partner.id} className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Image
                                    src={url}
                                    alt={`${partner.name} logo`}
                                    width={64}
                                    height={64}
                                    className="rounded-lg object-contain"
                                    data-ai-hint={hint}
                                />
                                <div>
                                <CardTitle>{partner.name}</CardTitle>
                                <Badge variant="secondary">{partner.category}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{partner.description}</CardDescription>
                            </CardContent>
                            </Card>
                        );
                        })}
                    </div>
                    </TabsContent>
                    <TabsContent value="grocery" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {groceryPartners.map((partner) => {
                        const { url, hint } = getImageUrl(partner.logo);
                        return (
                            <Card key={partner.id} className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Image
                                    src={url}
                                    alt={`${partner.name} logo`}
                                    width={64}
                                    height={64}
                                    className="rounded-lg object-contain"
                                    data-ai-hint={hint}
                                />
                                <div>
                                <CardTitle>{partner.name}</CardTitle>
                                <Badge variant="secondary">{partner.category}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{partner.description}</CardDescription>
                            </CardContent>
                            </Card>
                        );
                        })}
                    </div>
                    </TabsContent>
                </Tabs>
            </div>
        </TabsContent>
        <TabsContent value="post_job" className="mt-6">
          <PostJobForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
