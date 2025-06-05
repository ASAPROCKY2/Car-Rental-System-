import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { BookingsTable, TIBooking } from "../Drizzle/schema";


// Create a new booking
export const createBookingService = async (booking: TIBooking) => {
    const [inserted] = await db.insert(BookingsTable).values(booking).returning();
    if (inserted) {
        return inserted;
    }
    return null;
}


// Get all bookings
export const getBookingsService = async () => {
    const bookings = await db.query.BookingsTable.findMany();
    return bookings;
}


// Get booking by ID
export const getBookingByIdService = async (id: number) => {
    const booking = await db.query.BookingsTable.findFirst({
        where: eq(BookingsTable.bookingID, id)
    });
    return booking;
}


// Update booking by ID
export const updateBookingService = async (id: number, booking: TIBooking) => {
    await db.update(BookingsTable).set(booking).where(eq(BookingsTable.bookingID, id));
    return "Booking updated successfully";
}



// Delete booking by ID
export const deleteBookingService = async (id: number) => {
    await db.delete(BookingsTable).where(eq(BookingsTable.bookingID, id)).returning()
    return "Booking deleted successfully"
}