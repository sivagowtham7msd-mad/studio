'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Truck, Package, Home, CheckCircle, ZoomIn, ZoomOut } from 'lucide-react';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

function getImageUrl(id: string) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: 'https://picsum.photos/seed/placeholder/400/400', hint: 'placeholder item' };
}

const mapPlaceholder = getImageUrl('map-placeholder');

export default function OrderTrackingPage() {
  const params = useParams<{ id: string }>();
  const { toast } = useToast();
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    // Simulate OTP generation
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);

    toast({
      title: "Booking Confirmed!",
      description: `Your OTP for the doctor's visit is ${newOtp}.`,
    });
  }, [toast]);

  const timeline = [
    { status: 'Booking Placed', date: 'June 25, 2024, 10:30 AM', icon: Package, done: true },
    { status: 'Doctor on the way', date: 'June 25, 2024, 11:00 AM', icon: Truck, done: true },
    { status: 'Doctor Arrived', date: 'Awaiting Confirmation', icon: Home, done: false },
  ];
  
  const handleOtpChange = (element: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (isNaN(Number(element.target.value))) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.target.value : d))]);

    // Focus next input
    if (element.target.nextSibling && element.target.value) {
      (element.target.nextSibling as HTMLInputElement).focus();
    }
  };

  const confirmDelivery = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === generatedOtp) {
      toast({
        title: "Success!",
        description: "Doctor visit confirmed successfully.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid OTP. Please try again.",
      });
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Booking Tracking</h1>
            <p className="text-muted-foreground">Booking ID: #{params.id}</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Doctor Visit Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start pb-8">
                  {index < timeline.length - 1 && <div className="absolute left-[35px] top-2 h-full w-0.5 bg-border -translate-x-1/2"></div>}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${item.done ? 'bg-primary' : 'bg-muted'} mr-6 shrink-0`}>
                    <item.icon className={`h-6 w-6 ${item.done ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <p className="font-semibold">{item.status}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className='flex-col items-start gap-4'>
            <p className='text-sm text-muted-foreground'>Enter the One-Time Password (OTP) from the Saviour to confirm the visit.</p>
            <div className='flex gap-2'>
              {otp.map((data, index) => {
                return (
                  <input
                    key={index}
                    className='w-12 h-12 text-center border rounded-md text-2xl'
                    type="text"
                    name="otp"
                    maxLength={1}
                    value={data}
                    onChange={(e) => handleOtpChange(e, index)}
                    onFocus={(e) => e.target.select()}
                  />
                );
              })}
            </div>
            <Button onClick={confirmDelivery}><CheckCircle className='mr-2 h-4 w-4' />Confirm Visit</Button>
          </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Live Location</CardTitle>
                <CardDescription>Track your Doctor in real-time.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 h-96 relative">
                <div className="relative w-full h-full rounded-b-lg overflow-hidden">
                    <Image
                    src={mapPlaceholder.url}
                    alt="Map placeholder"
                    fill
                    className="object-cover transition-transform duration-300"
                    style={{ transform: `scale(${zoomLevel})` }}
                    data-ai-hint={mapPlaceholder.hint}
                    />
                </div>
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                    <Button size="icon" onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 3))}>
                        <ZoomIn className="h-5 w-5" />
                    </Button>
                    <Button size="icon" onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 1))}>
                        <ZoomOut className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Doctor Consultation</span>
              <span>₹800.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Visit Charges</span>
              <span>₹200.00</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹1000.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxes</span>
              <span>₹180.00</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹1180.00</span>
            </div>
          </CardContent>
          <CardFooter>
            <Badge variant="secondary">Payment: Pay on visit</Badge>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
