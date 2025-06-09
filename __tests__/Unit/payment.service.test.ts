import {createPaymentService,getPaymentService,getPaymentByIdService,updatePaymentService,deletePaymentService} from "../../src/payment/payment.service"

import db from "../../src/Drizzle/db"
import { PaymentTable } from "../../src/Drizzle/schema"

//mock the modules 
jest.mock("../../src/Drizzle/db", () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
        PaymentTable: {
            findMany: jest.fn(),
            findFirst: jest.fn()
        }
    }

}))

beforeEach(() => {
    jest.clearAllMocks();
});



//Test create payment 

describe("Payment Service", () => {
    describe("createPaymentService", () => {
        it("should insert a payment and return the inserted  payment", async () => {
            const payment = {
                bookingID: 1,
                paymentDate: new Date().toISOString(),
                amount: "100.00",
                paymentMethod: "Credit Card"
            };  // Mock payment object to be inserted
            const inserted = { id: 1, ...payment };
            // chaining
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([inserted])
                })
            });

            const result = await createPaymentService(payment)
            expect(db.insert).toHaveBeenCalledWith(PaymentTable)
            expect(result).toEqual(inserted)
        })


        it("should return null if insertion fails", async () => {
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([null])
                })
            })

            const payment = {
                bookingID: 2,
                paymentDate: new Date().toISOString(),
                amount: "200.00",
                paymentMethod: "Debit Card"
            };

            const result = await createPaymentService(payment);
            expect(result).toBeNull()

        })

        //
    })



    //test get all payments 
    describe("getPaymentService", () => {
        it("should return all payments", async () => {
            const payment = [
                { id: 1, paymentName: "Payment 1", description: "desc 1", customerId: 1, dueDate: new Date() },
                { id: 2, paymentName: "Payment 2", description: "desc 2", customerId: 1, dueDate: new Date() }
            ];
            (db.query.PaymentTable.findMany as jest.Mock).mockResolvedValueOnce(payment)

            const result = await getPaymentService()
            expect(result).toEqual(payment)
            
        })

        it("should return empty array if no payments", async () => {
            (db.query.PaymentTable.findMany as jest.Mock).mockResolvedValueOnce([])
            const result = await getPaymentService()
            expect(result).toEqual([])
        })
    })





    //test get payment by ID 

    describe("getPaymentByIdService", () => {
        it("should return a Payment if found", async () => {
            const payment = {
                id: 1,
                paymentName: "Payment 1",
                description: "desc",
                customerId: 1,
                dueDate: new Date()
            };
            (db.query.PaymentTable.findFirst as jest.Mock).mockResolvedValueOnce(payment)

            const result = await getPaymentByIdService(1)
            expect(db.query.PaymentTable.findFirst).toHaveBeenCalled()
            expect(result).toEqual(payment)
        })

        it("should return undefined if not found", async () => {
            (db.query.PaymentTable.findFirst as jest.Mock).mockResolvedValueOnce(undefined)
            const result = await getPaymentByIdService(9999)
            expect(result).toBeUndefined()
        })


    })





    //test update bookings

    describe("updatePaymentService", () => {
        it("should update a Payment and return success message", async () => {
            (db.update as jest.Mock).mockReturnValue({
                set: jest.fn().mockReturnValue({
                    where: jest.fn().mockResolvedValueOnce(undefined)
                })
            })

            const result = await updatePaymentService(1, {
                bookingID: 1,
                paymentDate: new Date().toISOString(),
                amount: "100.00",
                paymentMethod: "Credit Card"
            })

            expect(db.update).toHaveBeenCalledWith(PaymentTable)
            expect(result).toBe("Payment updated successfully")
        })
    })











})