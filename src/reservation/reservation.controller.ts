import { Request, Response } from "express";
import { createReservationService ,getReservationService ,getReservationByIdService, updateReservationService,deleteReservationService} from "./reservation.service";


// Create a new reservation
export const createReservationController = async (req: Request, res: Response) => {
    try {
        const reservation = req.body;



//convert due date to Date object
        if (reservation.dueDate) {
            reservation.dueDate = new Date(reservation.dueDate);    
        }




        const newReservation = await createReservationService(reservation);

        if (!newReservation) {
            return res.status(400).json({ message: "Reservation not created" });
        }
        return res.status(201).json({ message: "Reservation created successfully", reservation: newReservation });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};




// Get all reservations
export const getReservationController = async (req: Request, res: Response) => {
    try {
        const reservations = await getReservationService();
        if (!reservations || reservations.length === 0) {
            return res.status(404).json({ message: "No reservations found" });
        }
        return res.status(200).json({ data: reservations });
        
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};


// Get reservation by ID
export const getReservationByIdController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid reservation ID" });
        }

        const reservation = await getReservationByIdService(id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        return res.status(200).json({ data: reservation });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};





// Update reservation by ID
export const updateReservationController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid reservation ID" });
        }

        const reservation = req.body;

        //convert due date to Date object
        if (reservation.dueDate) {
            reservation.dueDate = new Date(reservation.dueDate);    
        }

        // Check if reservation exists
        const existingReservation = await getReservationByIdService(id);
        if (!existingReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        const updatedReservation = await updateReservationService(id, reservation);
        if (!updatedReservation) {
            return res.status(400).json({ message: "Reservation not updated" });
        }
        return res.status(200).json({ message: "Reservation updated successfully" });
    }
    catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}




// Delete reservation by ID
export const deleteReservationController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid reservation ID" });
        }

        // Check if reservation exists
        const existingReservation = await getReservationByIdService(id);
        if (!existingReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        
        const deleted = await deleteReservationService(id);
        if (!deleted) {
            return res.status(400).json({ message: "Reservation not deleted" });
        }   
        return res.status(204).json({ message: "Reservation deleted successfully" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}