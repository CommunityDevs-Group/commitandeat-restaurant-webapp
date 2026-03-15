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
