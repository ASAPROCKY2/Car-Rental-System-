import {Request, Response } from "express";
import { createBookingService,getBookingsService,getBookingByIdService,updateBookingService ,deleteBookingService} from "./booking.service";


// Create a new booking
export const createBookingController = async (req: Request, res: Response) => {
    try {
        const booking = req.body;

        const newBooking = await createBookingService(booking);

        if (!newBooking) {
            return res.status(400).json({ message: "Booking not created" });
        }
        return res.status(201).json({ message: "Booking created successfully", booking: newBooking });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};


// Get all bookings
export const getBookingsController = async (req: Request, res: Response) => {
    try {
        const bookings = await getBookingsService();
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }
        return res.status(200).json({ data: bookings });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};



// Get booking by ID
export const getBookingByIdController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid booking ID" });
        }

        const booking = await getBookingByIdService(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        return res.status(200).json({ data: booking });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};



// Update booking by ID
export const updateBookingController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid booking ID" });
        }

        const booking = req.body;

        const existingBooking = await getBookingByIdService(id);
        if (!existingBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const updatedBooking = await updateBookingService(id, booking);
        if (!updatedBooking) {
            return res.status(400).json({ message: "Booking not updated" });
        }
        return res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};



// Delete booking by ID
export const deleteBookingController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid booking ID" });
        }

        const existingBooking = await getBookingByIdService(id);
        if (!existingBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const deleted= await deleteBookingService(id);
        if (!deleted) {
            return res.status(400).json({ message: "Booking not deleted" });
        }
        return res.status(204).json({ message: "Booking deleted successfully" });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}