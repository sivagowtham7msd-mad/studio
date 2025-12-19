'use client';
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, CreditCard, Wallet } from "lucide-react";
import { medicines, type Product } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function getImageUrl(id: string) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: 'https://picsum.photos/seed/placeholder/400/400', hint: 'placeholder item' };
}

export default function MedicinesPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredMedicines = medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
  };
  
  const handlePayment = () => {
    toast({
        title: "Order Placed!",
        description: `Your order for ${selectedProduct?.name} has been placed successfully.`,
    });
    const orderId = `med-${Math.random().toString(36).substring(2, 9)}`;
    router.push(`/track-order/${orderId}?item=${selectedProduct?.name}&price=${selectedProduct?.price}`);
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Order Medicines</h1>
        <p className="text-muted-foreground">Search and order from a wide range of medicines.</p>
      </div>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search for medicines..." 
          className="pl-8" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredMedicines.map((medicine) => {
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
                <p className="font-bold text-lg">₹{medicine.price.toFixed(2)}</p>
                <Button onClick={() => handleAddToCart(medicine)}>
                  <Plus className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={(isOpen) => !isOpen && setSelectedProduct(null)}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Select Payment Method</DialogTitle>
                <DialogDescription>
                    You are ordering {selectedProduct.name} for ₹{selectedProduct.price.toFixed(2)}.
                </DialogDescription>
                </DialogHeader>
                <RadioGroup defaultValue="cod" className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
                    <Label
                      htmlFor="cod"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Wallet className="mb-3 h-6 w-6" />
                      Cash on Delivery
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="online" id="online" className="peer sr-only" />
                    <Label
                      htmlFor="online"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      Banking Apps
                    </Label>
                  </div>
                </RadioGroup>
                <DialogFooter>
                    <Button onClick={handlePayment} className='w-full'>Proceed</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
