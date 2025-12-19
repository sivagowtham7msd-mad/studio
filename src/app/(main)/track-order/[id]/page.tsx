'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
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
import { Truck, Package, Home, CheckCircle } from 'lucide-react';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

function getImageUrl(id: string) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: 'https://picsum.photos/seed/placeholder/400/400', hint: 'placeholder item' };
}

const mapPlaceholder = getImageUrl('map-placeholder');

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const itemName = searchParams.get('item');
  const itemPrice = searchParams.get('price');
  
  const [timeline, setTimeline] = useState([
    { status: 'Order Placed', date: new Date().toLocaleString(), icon: Package, done: true },
    { status: 'Out for Delivery', date: 'In progress...', icon: Truck, done: false },
    { status: 'Delivered', date: 'Awaiting delivery', icon: Home, done: false },
  ]);

  useEffect(() => {
    const deliveryTimeout = setTimeout(() => {
      setTimeline(prev => prev.map(item => 
        item.status === 'Out for Delivery' ? { ...item, done: true, date: new Date().toLocaleString() } : item
      ));
    }, 5000); // Simulate 5 seconds to go out for delivery

    const deliveredTimeout = setTimeout(() => {
      setTimeline(prev => prev.map(item => 
        item.status === 'Delivered' ? { ...item, done: true, date: new Date().toLocaleString() } : item
      ));
    }, 10000); // Simulate 10 seconds to be delivered

    return () => {
      clearTimeout(deliveryTimeout);
      clearTimeout(deliveredTimeout);
    };
  }, []);

  const subtotal = parseFloat(itemPrice || '0');
  const taxes = subtotal * 0.05; // 5% tax
  const total = subtotal + taxes;

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Order Tracking</h1>
            <p className="text-muted-foreground">Order ID: #{params.id}</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Delivery Timeline</CardTitle>
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
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Live Location</CardTitle>
                <CardDescription>Track your delivery in real-time.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 h-96">
                <div className="relative w-full h-full rounded-b-lg overflow-hidden">
                    <Image
                    src={mapPlaceholder.url}
                    alt="Map placeholder"
                    fill
                    className="object-cover"
                    data-ai-hint={mapPlaceholder.hint}
                    />
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{itemName || 'Item'}</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxes (5%)</span>
              <span>₹{taxes.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Badge variant="secondary">Payment: Cash on Delivery</Badge>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
