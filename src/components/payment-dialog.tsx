'use client';

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
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard, ArrowLeft } from "lucide-react";
import type { Product } from "@/lib/data";
import { Separator } from "./ui/separator";

interface PaymentDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed: (paymentMethod: string) => void;
}

const upiApps = ["Google Pay", "PhonePe"];
const bankingApps = ["Canara Bank", "TMB Bank", "SBI Bank", "ICICI Bank", "Axis Bank", "Andhra Bank"];

export function PaymentDialog({ product, open, onOpenChange, onProceed }: PaymentDialogProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleProceed = () => {
    if (paymentMethod === 'online' && step === 1) {
      setStep(2);
    } else {
      onProceed(paymentMethod);
    }
  };

  const handleOnlinePayment = () => {
    onProceed('online');
  }

  const renderStep1 = () => (
    <>
      <DialogHeader>
        <DialogTitle>Select Payment Method</DialogTitle>
        <DialogDescription>
          You are ordering {product.name} for ₹{product.price.toFixed(2)}.
        </DialogDescription>
      </DialogHeader>
      <RadioGroup defaultValue="cod" onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-4">
        <div>
          <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
          <Label
            htmlFor="cod"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-full"
          >
            <Wallet className="mb-3 h-6 w-6" />
            Pay Cash After Service
          </Label>
        </div>
        <div>
          <RadioGroupItem value="online" id="online" className="peer sr-only" />
          <Label
            htmlFor="online"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-full"
          >
            <CreditCard className="mb-3 h-6 w-6" />
            Pay Through UPI / Banking
          </Label>
        </div>
      </RadioGroup>
      <DialogFooter>
        <Button onClick={handleProceed} className='w-full'>Proceed</Button>
      </DialogFooter>
    </>
  );

  const renderStep2 = () => (
    <>
      <DialogHeader>
         <Button variant="ghost" size="sm" className="absolute left-4 top-4" onClick={() => setStep(1)}>
            <ArrowLeft className="h-4 w-4" />
        </Button>
        <DialogTitle className="text-center">Pay Online</DialogTitle>
        <DialogDescription className="text-center">
            Select your preferred payment method.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div>
            <h3 className="mb-2 font-semibold">UPI Apps</h3>
            <div className="grid grid-cols-2 gap-2">
                {upiApps.map(app => (
                    <Button key={app} variant="outline" onClick={handleOnlinePayment}>{app}</Button>
                ))}
            </div>
        </div>
        <Separator />
        <div>
            <h3 className="mb-2 font-semibold">Banking Apps</h3>
            <div className="grid grid-cols-2 gap-2">
                {bankingApps.map(app => (
                    <Button key={app} variant="outline" onClick={handleOnlinePayment}>{app}</Button>
                ))}
            </div>
        </div>
      </div>
    </>
  )

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) {
            setStep(1);
        }
        onOpenChange(isOpen);
    }}>
      <DialogContent>
        {step === 1 ? renderStep1() : renderStep2()}
      </DialogContent>
    </Dialog>
  );
}
