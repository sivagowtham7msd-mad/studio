'use client';
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import { groceries, type Product } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { PaymentDialog } from "@/components/payment-dialog";


function getImageUrl(id: string) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: 'https://picsum.photos/seed/placeholder/400/400', hint: 'placeholder item' };
}

export default function GroceriesPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredGroceries = groceries.filter(grocery => 
    grocery.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
  };

  const handlePayment = () => {
    if (!selectedProduct) return;
    toast({
        title: "Order Placed!",
        description: `Your order for ${selectedProduct.name} has been placed successfully.`,
    });
    const orderId = `groc-${Math.random().toString(36).substring(2, 9)}`;
    router.push(`/track-order/${orderId}?item=${selectedProduct.name}&price=${selectedProduct.price}`);
    setSelectedProduct(null);
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Shop Groceries</h1>
        <p className="text-muted-foreground">Fresh produce and daily essentials delivered to your door.</p>
      </div>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search for grocery items..." 
          className="pl-8" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredGroceries.map((grocery) => {
          const { url, hint } = getImageUrl(grocery.image);
          return (
            <Card key={grocery.id} className="flex flex-col">
              <CardHeader className="p-0">
                <div className="relative w-full h-48">
                  <Image
                    src={url}
                    alt={grocery.name}
                    fill
                    className="object-cover rounded-t-lg"
                    data-ai-hint={hint}
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex-grow">
                <CardTitle className="text-lg font-semibold font-headline mb-1">{grocery.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{grocery.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p className="font-bold text-lg">₹{grocery.price.toFixed(2)}</p>
                <Button onClick={() => handleAddToCart(grocery)}>
                  <Plus className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {selectedProduct && (
        <PaymentDialog
          product={selectedProduct}
          open={!!selectedProduct}
          onOpenChange={(isOpen) => !isOpen && setSelectedProduct(null)}
          onProceed={handlePayment}
        />
      )}
    </div>
  );
}
