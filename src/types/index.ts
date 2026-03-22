export type TableStatus = "available" | "reserved" | "occupied";

export interface TableWithStatus {
  id: string;
  number: number;
  capacity: number;
  positionX: number;
  positionY: number;
  status: TableStatus;
}

export interface ReservationFormData {
  guestName: string;
  phone: string;
  email?: string;
  guestCount: number;
  date: string;
  startTime: string;
  endTime: string;
  tableId: string;
  notes?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

// Cart
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

// Contact
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactInfo {
  icon: string;
  title: string;
  details: string[];
}

// Gallery
export type GalleryCategory = "all" | "food" | "interior";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
}

// Menu
export type MenuCategoryTab = "dishes" | "main-courses" | "beverages";

// Reservation Steps
export type ReservationStep = 1 | 2 | 3;

export interface ReservationStepData {
  // Step 1: Date & Time
  date: string;
  startTime: string;
  // Step 2: Details
  guestCount: number;
  occasion?: string;
  // Step 3: Contact
  guestName: string;
  phone: string;
  specialRequests?: string;
}
