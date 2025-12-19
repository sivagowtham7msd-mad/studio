import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import { medicines } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

function getImageUrl(id: string) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: 'https://picsum.photos/seed/placeholder/400/400', hint: 'placeholder item' };
}

export default function MedicinesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Order Medicines</h1>
        <p className="text-muted-foreground">Search and order from a wide range of medicines.</p>
      </div>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search for medicines..." className="pl-8" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {medicines.map((medicine) => {
          const { url, hint } = getImageUrl(medicine.image);
          return (
            <Card key={medicine.id} className="flex flex-col">
              <CardHeader className="p-0">
                <div className="relative w-full h-48">
                  <Image
                    src={url}
                    alt={medicine.name}
                    fill
                    className="object-cover rounded-t-lg"
                    data-ai-hint={hint}
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex-grow">
                <CardTitle className="text-lg font-semibold font-headline mb-1">{medicine.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{medicine.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p className="font-bold text-lg">${medicine.price.toFixed(2)}</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
