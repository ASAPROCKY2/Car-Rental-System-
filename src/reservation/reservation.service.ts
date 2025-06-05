import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { TIReservation,ReservationTable } from "../Drizzle/schema"; 


// Create a new reservation
export const createReservationService = async (reservation: TIReservation) => {
  const [inserted] = await db.insert(ReservationTable).values(reservation).returning();
  if (inserted) {
    return inserted;
  }
  return null;
}


// Get all reservations
export const getReservationService = async () => {
    const reservations = await db.query.ReservationTable.findMany();
    return reservations;
    }




    // Get reservation by ID
    export const getReservationByIdService=async (id:number) => {
        const reservation=await db.query.ReservationTable.findFirst({
            where:eq(ReservationTable.reservationID,id)
        })
        return reservation
    
    }



    //update reservation by ID
    export const updateReservationService=async (id:number, reservation:TIReservation)=> {
        await db.update(ReservationTable).set(reservation).where(eq(ReservationTable.reservationID, id));
        return "Reservation updated successfully";
    } 



    //delete reservation by ID
    export const deleteReservationService=async (id:number)=> {
        await db.delete(ReservationTable).where(eq(ReservationTable.reservationID, id));
        return "Reservation deleted successfully";
    }