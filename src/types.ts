export type BookingStatus = 'solicitado' | 'confirmado' | 'cancelado';

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email?: string;
  treatment: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:mm format
  status: BookingStatus;
  createdAt: number;
}

export interface BookedSlot {
  id: string; // e.g. "2024-10-25_14:30"
  date: string;
  time: string;
  status: BookingStatus;
}
