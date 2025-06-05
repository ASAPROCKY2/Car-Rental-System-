import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { TIPayment,PaymentTable } from "../Drizzle/schema";


// Create a new payment
export const createPaymentService = async (payment: TIPayment) => {
const [inserted]= await db.insert(PaymentTable).values(payment).returning();
if (inserted) {
    return inserted 
}

return null

}


//Get all payments 
export const getPaymentService = async () => {
const payments=await db.query.PaymentTable.findMany()
return payments;

}
   


// Get a payment by ID
export const getPaymentByIdService = async (paymentId: number) => {
const payment=await db.query.PaymentTable.findFirst({
    where:eq(PaymentTable.paymentID, paymentId)
})
 return payment;
}


//update a payment by ID
export const updatePaymentService = async (paymentId: number, payment: TIPayment) => {
    await db.update(PaymentTable).set(payment).where(eq(PaymentTable.paymentID, paymentId));
    return "Payment updated successfully";

}


// Delete a payment by ID
export const deletePaymentService = async (paymentId: number) => {
    await db.delete(PaymentTable).where(eq(PaymentTable.paymentID, paymentId)).returning()
    return "Payment deleted successfully";
}


