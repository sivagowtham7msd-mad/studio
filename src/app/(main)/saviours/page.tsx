'use client';
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { saviours } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

function getImageUrl(id: string) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: 'https://picsum.photos/seed/placeholder/200/200', hint: 'placeholder logo' };
}

export default function SavioursPage() {
  const medicineSaviours = saviours.filter(s => s.category === 'Medicine');
  const grocerySaviours = saviours.filter(s => s.category === 'Grocery');

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Our Saviours</h1>
        <p className="text-muted-foreground">Meet the partners who help us serve you.</p>
      </div>
      <Tabs defaultValue="medicine" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="medicine">Medicine Partners</TabsTrigger>
          <TabsTrigger value="grocery">Grocery Partners</TabsTrigger>
        </TabsList>
        <TabsContent value="medicine" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {medicineSaviours.map((saviour) => {
              const { url, hint } = getImageUrl(saviour.logo);
              return (
                <Card key={saviour.id}>
                  <CardHeader className="flex flex-row items-center gap-4">
                     <Image
                        src={url}
                        alt={`${saviour.name} logo`}
                        width={64}
                        height={64}
                        className="rounded-lg object-contain"
                        data-ai-hint={hint}
                      />
                    <div>
                      <CardTitle>{saviour.name}</CardTitle>
                      <Badge variant="secondary">{saviour.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{saviour.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="grocery" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {grocerySaviours.map((saviour) => {
              const { url, hint } = getImageUrl(saviour.logo);
              return (
                <Card key={saviour.id}>
                  <CardHeader className="flex flex-row items-center gap-4">
                     <Image
                        src={url}
                        alt={`${saviour.name} logo`}
                        width={64}
                        height={64}
                        className="rounded-lg object-contain"
                        data-ai-hint={hint}
                      />
                    <div>
                      <CardTitle>{saviour.name}</CardTitle>
                      <Badge variant="secondary">{saviour.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{saviour.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
