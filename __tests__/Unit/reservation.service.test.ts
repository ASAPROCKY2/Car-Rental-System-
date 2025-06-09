import {createReservationService,getReservationService,getReservationByIdService,updateReservationService,deleteReservationService} from "../../src/reservation/reservation.service"
import db from "../../src/Drizzle/db"
 import { ReservationTable } from "../../src/Drizzle/schema"




 //mock the modules

 jest.mock("../../src/Drizzle/db", () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
        ReservationTable: {
            findMany: jest.fn(),
            findFirst: jest.fn()
        }
    }

}))

beforeEach(() => {
    jest.clearAllMocks();
});



//test create reservation 

describe("Reservation Service", () => {
    describe("createReservationService", () => {
        it("should insert a Reservation and return the inserted Reservation", async () => {
            const reservation = {
                customerID: 1,
                carID: 1,
                reservationDate: "2024-06-01",
                pickupDate: "2024-06-02",
                // Optional fields
                reservationID: 1,
                returnDate: null
            };  // Mock reservation object to be inserted
            const inserted = { id: 1, ...reservation };
            // chaining
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([inserted])
                })
            });

            const result = await createReservationService(reservation)
            expect(db.insert).toHaveBeenCalledWith(ReservationTable)
            expect(result).toEqual(inserted)
        })


        it("should return null if insertion fails", async () => {
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([null])
                })
            })

            const reservation = {
                customerID: 1,
                carID: 1,
                reservationDate: "2024-06-01",
                pickupDate: "2024-06-02",
                // Optional fields
                reservationID: 2,
                returnDate: null
            };

            const result = await createReservationService(reservation);
            expect(result).toBeNull()

        })

        //
    })


    

    //test get all Reservation

     describe("getReservationService", () => {
        it("should return all Reservation", async () => {
            const reservation = [
                { id: 1, reservationName: "Reservation 1", description: "desc 1", userId: 1, dueDate: new Date() },
                { id: 2, reservationName: "Reservation 2", description: "desc 2", userId: 1, dueDate: new Date() }
            ];
            (db.query.ReservationTable.findMany as jest.Mock).mockResolvedValueOnce(reservation)

            const result = await getReservationService()
            expect(result).toEqual(reservation)
        })

        it("should return empty array if no todos", async () => {
            (db.query.ReservationTable.findMany as jest.Mock).mockResolvedValueOnce([])
            const result = await getReservationService()
            expect(result).toEqual([])
        })
    })

 




    //Test get reservation by ID 


    describe("getReservationByIdService", () => {
        it("should return a todo if found", async () => {
            const reservation = {
                id: 1,
                todoName: "Reservation 1",
                description: "desc",
                customerID: 1,
                dueDate: new Date()
            };
            (db.query.ReservationTable.findFirst as jest.Mock).mockResolvedValueOnce(reservation)

            const result = await getReservationByIdService(1)
            expect(db.query.ReservationTable.findFirst).toHaveBeenCalled()
            expect(result).toEqual(reservation)
        })

        it("should return undefined if not found", async () => {
            (db.query.ReservationTable.findFirst as jest.Mock).mockResolvedValueOnce(undefined)
            const result = await getReservationByIdService(9999)
            expect(result).toBeUndefined()
        })


    })









    //test update reservation 


    describe("updateReservationService", () => {
        it("should update a reservation and return success message", async () => {
            (db.update as jest.Mock).mockReturnValue({
                set: jest.fn().mockReturnValue({
                    where: jest.fn().mockResolvedValueOnce(undefined)
                })
            })

            const result = await updateReservationService(1, {
                reservationDate: "2024-06-01",
                customerID: 1,
                carID: 1,
                pickupDate: "2024-06-02"
            })

            expect(db.update).toHaveBeenCalledWith(ReservationTable)
            expect(result).toBe("Reservation updated successfully")
        })
    })
















})