import Image from 'next/image';
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

function getImageUrl(id: string) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: 'https://picsum.photos/seed/placeholder/400/400', hint: 'placeholder item' };
}

const mapPlaceholder = getImageUrl('map-placeholder');

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const timeline = [
    { status: 'Order Placed', date: 'June 25, 2024, 10:30 AM', icon: Package, done: true },
    { status: 'Out for Delivery', date: 'June 25, 2024, 11:00 AM', icon: Truck, done: true },
    { status: 'Delivered', date: 'Awaiting Confirmation', icon: Home, done: false },
  ];

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
          <CardFooter className='flex-col items-start gap-4'>
            <p className='text-sm text-muted-foreground'>Enter the One-Time Password (OTP) from the Saviour to confirm delivery.</p>
            <div className='flex gap-2'>
              <input className='w-12 h-12 text-center border rounded-md text-2xl' maxLength={1} />
              <input className='w-12 h-12 text-center border rounded-md text-2xl' maxLength={1} />
              <input className='w-12 h-12 text-center border rounded-md text-2xl' maxLength={1} />
              <input className='w-12 h-12 text-center border rounded-md text-2xl' maxLength={1} />
            </div>
            <Button><CheckCircle className='mr-2 h-4 w-4' />Confirm Delivery</Button>
          </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Live Location</CardTitle>
                <CardDescription>Track your Saviour in real-time.</CardDescription>
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
              <span className="text-muted-foreground">Paracetamol 500mg (x1)</span>
              <span>₹20.50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fresh Milk (1L) (x2)</span>
              <span>₹101.00</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹121.50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span>₹10.00</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹131.50</span>
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
