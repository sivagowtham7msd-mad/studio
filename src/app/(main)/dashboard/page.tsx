import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Stethoscope, Pill, ShoppingCart, Briefcase, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const services = [
    {
      title: "Book a Mobile Doctor",
      description: "Get medical attention at your doorstep.",
      href: "/doctors",
      icon: Stethoscope,
    },
    {
      title: "Order Medicines",
      description: "Fast delivery from your local pharmacies.",
      href: "/medicines",
      icon: Pill,
    },
    {
      title: "Shop Groceries",
      description: "Fresh produce and daily essentials delivered.",
      href: "/groceries",
      icon: ShoppingCart,
    },
    {
      title: "Find Saviour Jobs",
      description: "Explore local and national job vacancies.",
      href: "/jobs",
      icon: Briefcase,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome to StreetVerse</h1>
        <p className="text-muted-foreground">Your all-in-one platform for local services and opportunities.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <Link href={service.href} key={service.title} className="block h-full">
            <Card className="group flex flex-col justify-between h-full hover:border-primary transition-colors duration-300">
              <div>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-accent">
                    <service.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg font-semibold font-headline mb-1">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </div>
              <CardFooter>
                <div className="flex items-center text-sm text-primary font-medium">
                  Go to section
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
