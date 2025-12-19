import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin } from "lucide-react";
import { doctors } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

function getImageUrl(id: string) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: 'https://picsum.photos/seed/placeholder/400/400', hint: 'placeholder item' };
}

const mapPlaceholder = getImageUrl('map-placeholder');

export default function DoctorsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Book a Mobile Doctor</h1>
        <p className="text-muted-foreground">Select a doctor and choose a location for their visit.</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold font-headline">Available Doctors</h2>
          <div className="flex flex-col gap-4">
            {doctors.map((doctor) => {
              const { url, hint } = getImageUrl(doctor.image);
              return (
                <Card key={doctor.id} className="flex items-center p-4">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src={url} alt={doctor.name} data-ai-hint={hint} />
                    <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <h3 className="font-bold">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    <div className="flex items-center text-sm mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{doctor.rating} ({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                  <Button>Book Now</Button>
                </Card>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold font-headline">Set Location</h2>
          <Card className="flex-grow">
            <CardContent className="p-0 h-full">
              <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={mapPlaceholder.url}
                  alt="Map placeholder"
                  fill
                  className="object-cover"
                  data-ai-hint={mapPlaceholder.hint}
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center flex-col text-white p-4 text-center">
                    <MapPin className="w-12 h-12 mb-4" />
                    <h3 className="text-xl font-bold">Map View</h3>
                    <p>Select your location on the map</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
