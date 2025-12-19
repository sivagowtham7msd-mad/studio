
export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Medicine' | 'Grocery';
  description: string;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  postedDate: string;
  description: string;
};

export type Saviour = {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: 'Medicine' | 'Grocery'
}

export const doctors: Doctor[] = [
  { id: '1', name: 'Dr. John Doe', specialty: 'General Physician', rating: 4.8, reviews: 120, image: 'doctor1' },
  { id: '2', name: 'Dr. Jane Smith', specialty: 'Pediatrician', rating: 4.9, reviews: 98, image: 'doctor2' },
  { id: '3', name: 'Dr. Emily White', specialty: 'Dermatologist', rating: 4.7, reviews: 75, image: 'doctor3' },
  { id: '4', name: 'Dr. Michael Brown', specialty: 'Cardiologist', rating: 4.9, reviews: 210, image: 'doctor4' },
];

export const medicines: Product[] = [
  { id: 'med1', name: 'Paracetamol 500mg', price: 20.50, image: 'medicine1', category: 'Medicine', description: 'For fever and pain relief.' },
  { id: 'med2', name: 'Ibuprofen 200mg', price: 40.00, image: 'medicine2', category: 'Medicine', description: 'Anti-inflammatory and pain reliever.' },
  { id: 'med3', name: 'Antacid Syrup', price: 55.50, image: 'medicine3', category: 'Medicine', description: 'Relieves heartburn and indigestion.' },
  { id: 'med4', name: 'Cough Syrup', price: 60.00, image: 'medicine4', category: 'Medicine', description: 'Soothes cough and throat irritation.' },
  { id: 'med5', name: 'Vitamin C Tablets', price: 72.25, image: 'medicine5', category: 'Medicine', description: 'Boosts immunity.' },
  { id: 'med6', name: 'Band-Aids (Box of 20)', price: 30.00, image: 'medicine6', category: 'Medicine', description: 'For minor cuts and scrapes.' },
];

export const groceries: Product[] = [
  { id: 'groc1', name: 'Fresh Milk (1L)', price: 50.50, image: 'grocery1', category: 'Grocery', description: 'Pasteurized whole milk.' },
  { id: 'groc2', name: 'Brown Bread', price: 42.20, image: 'grocery2', category: 'Grocery', description: 'Whole wheat bread loaf.' },
  { id: 'groc3', name: 'Organic Apples (1kg)', price: 150.50, image: 'grocery3', category: 'Grocery', description: 'Fresh and juicy organic apples.' },
  { id: 'groc4', name: 'Free-range Eggs (12)', price: 80.80, image: 'grocery4', category: 'Grocery', description: 'Farm-fresh free-range eggs.' },
  { id: 'groc5', name: 'Cheddar Cheese (200g)', price: 200.00, image: 'grocery5', category: 'Grocery', description: 'Aged cheddar cheese block.' },
  { id: 'groc6', name: 'Basmati Rice (1kg)', price: 120.00, image: 'grocery6', category: 'Grocery', description: 'Long-grain aromatic basmati rice.' },
];

export const jobs: Job[] = [
    { id: 'job1', title: 'Delivery Saviour', company: 'All in one app', location: 'Nationwide', type: 'Part-time', postedDate: '2 days ago', description: 'Flexible delivery job for our platform.' },
    { id: 'job2', title: 'Customer Support', company: 'LocalMart', location: 'Mumbai, MH', type: 'Full-time', postedDate: '5 days ago', description: 'Assist customers with orders and inquiries.' },
    { id: 'job3', title: 'Warehouse Associate', company: 'QuickMeds', location: 'Chicago, IL', type: 'Full-time', postedDate: '1 week ago', description: 'Manage inventory and pack orders.' },
];

export const saviours: Saviour[] = [
  { id: 'saviour1', name: 'MedPlus', logo: 'medplus-logo', description: 'Trusted pharmacy for all your medical needs.', category: 'Medicine' },
  { id: 'saviour2', name: 'PharmEasy', logo: 'pharmeasy-logo', description: 'Your one-stop shop for medicines and healthcare products.', category: 'Medicine' },
  { id: 'saviour3', name: 'Apollo Pharmacy', logo: 'apollo-logo', description: 'Part of Apollo Hospitals Group, offering genuine medicines.', category: 'Medicine' },
  { id: 'saviour4', name: 'Swiggy Instamart', logo: 'instamart-logo', description: 'Instant grocery delivery at your doorstep.', category: 'Grocery' },
  { id: 'saviour5', name: 'Zepto', logo: 'zepto-logo', description: '10-minute grocery delivery service.', category: 'Grocery' },
]
