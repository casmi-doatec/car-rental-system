export interface Vehicle {
  id: string;
  name: string;
  category: string;
  image: string;
  pricePerDay: number;
  seats: number;
  transmission: "AT" | "MT";
  fuelType: string;
  features: string[];
  available: boolean;
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
  totalAmount: number;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  bookings: number;
}

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    name: "Toyota Aqua",
    category: "Compact",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600&h=400&fit=crop",
    pricePerDay: 5000,
    seats: 5,
    transmission: "AT",
    fuelType: "Hybrid",
    features: ["Bluetooth", "Backup Camera", "USB Port"],
    available: true,
  },
  {
    id: "v2",
    name: "Honda Fit",
    category: "Compact",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&h=400&fit=crop",
    pricePerDay: 4500,
    seats: 5,
    transmission: "AT",
    fuelType: "Gasoline",
    features: ["Bluetooth", "Navigation", "USB Port"],
    available: true,
  },
  {
    id: "v3",
    name: "Toyota Alphard",
    category: "Van",
    image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=600&h=400&fit=crop",
    pricePerDay: 15000,
    seats: 7,
    transmission: "AT",
    fuelType: "Gasoline",
    features: ["Leather Seats", "Navigation", "Bluetooth", "Rear Monitor"],
    available: true,
  },
  {
    id: "v4",
    name: "Nissan Note",
    category: "Compact",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&h=400&fit=crop",
    pricePerDay: 4000,
    seats: 5,
    transmission: "AT",
    fuelType: "Hybrid",
    features: ["Bluetooth", "Backup Camera"],
    available: false,
  },
  {
    id: "v5",
    name: "Toyota Land Cruiser",
    category: "SUV",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop",
    pricePerDay: 20000,
    seats: 5,
    transmission: "AT",
    fuelType: "Diesel",
    features: ["4WD", "Leather Seats", "Navigation", "Sunroof"],
    available: true,
  },
  {
    id: "v6",
    name: "Suzuki Jimny",
    category: "SUV",
    image: "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?w=600&h=400&fit=crop",
    pricePerDay: 7000,
    seats: 4,
    transmission: "MT",
    fuelType: "Gasoline",
    features: ["4WD", "Bluetooth"],
    available: true,
  },
];

export const bookings: Booking[] = [
  {
    id: "b1",
    customerName: "John Smith",
    customerEmail: "john@example.com",
    customerPhone: "+81-90-1234-5678",
    vehicleId: "v1",
    startDate: "2026-06-22",
    endDate: "2026-06-25",
    status: "confirmed",
    totalAmount: 15000,
    createdAt: "2026-06-20",
  },
  {
    id: "b2",
    customerName: "Maria Garcia",
    customerEmail: "maria@example.com",
    customerPhone: "+81-80-9876-5432",
    vehicleId: "v3",
    startDate: "2026-06-23",
    endDate: "2026-06-28",
    status: "pending",
    totalAmount: 75000,
    createdAt: "2026-06-21",
  },
  {
    id: "b3",
    customerName: "Tanaka Yuki",
    customerEmail: "tanaka@example.com",
    customerPhone: "+81-70-1111-2222",
    vehicleId: "v4",
    startDate: "2026-06-18",
    endDate: "2026-06-21",
    status: "active",
    totalAmount: 12000,
    createdAt: "2026-06-17",
  },
  {
    id: "b4",
    customerName: "David Lee",
    customerEmail: "david@example.com",
    customerPhone: "+81-90-3333-4444",
    vehicleId: "v5",
    startDate: "2026-06-10",
    endDate: "2026-06-15",
    status: "completed",
    totalAmount: 100000,
    createdAt: "2026-06-08",
  },
  {
    id: "b5",
    customerName: "Chen Wei",
    customerEmail: "chen@example.com",
    customerPhone: "+81-80-5555-6666",
    vehicleId: "v6",
    startDate: "2026-06-25",
    endDate: "2026-06-30",
    status: "pending",
    totalAmount: 35000,
    createdAt: "2026-06-21",
  },
];

export const customers: Customer[] = [
  { id: "c1", name: "John Smith", email: "john@example.com", phone: "+81-90-1234-5678", nationality: "USA", bookings: 3 },
  { id: "c2", name: "Maria Garcia", email: "maria@example.com", phone: "+81-80-9876-5432", nationality: "Spain", bookings: 1 },
  { id: "c3", name: "Tanaka Yuki", email: "tanaka@example.com", phone: "+81-70-1111-2222", nationality: "Japan", bookings: 5 },
  { id: "c4", name: "David Lee", email: "david@example.com", phone: "+81-90-3333-4444", nationality: "Korea", bookings: 2 },
  { id: "c5", name: "Chen Wei", email: "chen@example.com", phone: "+81-80-5555-6666", nationality: "China", bookings: 1 },
  { id: "c6", name: "Sophie Martin", email: "sophie@example.com", phone: "+81-70-7777-8888", nationality: "France", bookings: 4 },
];

export const scheduleEvents = [
  { vehicleId: "v1", date: "2026-06-22", type: "booked" as const, customer: "John Smith" },
  { vehicleId: "v1", date: "2026-06-23", type: "booked" as const, customer: "John Smith" },
  { vehicleId: "v1", date: "2026-06-24", type: "booked" as const, customer: "John Smith" },
  { vehicleId: "v1", date: "2026-06-25", type: "booked" as const, customer: "John Smith" },
  { vehicleId: "v3", date: "2026-06-23", type: "booked" as const, customer: "Maria Garcia" },
  { vehicleId: "v3", date: "2026-06-24", type: "booked" as const, customer: "Maria Garcia" },
  { vehicleId: "v3", date: "2026-06-25", type: "booked" as const, customer: "Maria Garcia" },
  { vehicleId: "v3", date: "2026-06-26", type: "booked" as const, customer: "Maria Garcia" },
  { vehicleId: "v3", date: "2026-06-27", type: "booked" as const, customer: "Maria Garcia" },
  { vehicleId: "v3", date: "2026-06-28", type: "booked" as const, customer: "Maria Garcia" },
  { vehicleId: "v4", date: "2026-06-18", type: "booked" as const, customer: "Tanaka Yuki" },
  { vehicleId: "v4", date: "2026-06-19", type: "booked" as const, customer: "Tanaka Yuki" },
  { vehicleId: "v4", date: "2026-06-20", type: "booked" as const, customer: "Tanaka Yuki" },
  { vehicleId: "v4", date: "2026-06-21", type: "booked" as const, customer: "Tanaka Yuki" },
  { vehicleId: "v5", date: "2026-06-25", type: "maintenance" as const, customer: "" },
  { vehicleId: "v6", date: "2026-06-25", type: "booked" as const, customer: "Chen Wei" },
  { vehicleId: "v6", date: "2026-06-26", type: "booked" as const, customer: "Chen Wei" },
  { vehicleId: "v6", date: "2026-06-27", type: "booked" as const, customer: "Chen Wei" },
  { vehicleId: "v6", date: "2026-06-28", type: "booked" as const, customer: "Chen Wei" },
  { vehicleId: "v6", date: "2026-06-29", type: "booked" as const, customer: "Chen Wei" },
  { vehicleId: "v6", date: "2026-06-30", type: "booked" as const, customer: "Chen Wei" },
];
