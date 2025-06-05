import { Request, Response } from "express";
import { createPaymentService ,getPaymentService,getPaymentByIdService,updatePaymentService,deletePaymentService} from "./payment.service";


// Create a new payment
export const createPaymentController = async (req: Request, res: Response) => {
    try {
        const payment = req.body;


    const newPayment = await createPaymentService(payment);
    if (!newPayment) {
        return res.status(400).json({message: "Payment not created successfully"});
    }
    return res.status(201).json({message: "Payment created successfully", payment: newPayment});
}
catch (error:any) {
    return res.status(500).json({error: error.message});
}
};


// Get all payments
export const getPaymentsController = async (_: Request, res: Response) => {
    try {
        const payments = await getPaymentService();
        if (!payments || payments.length === 0) {
            return res.status(404).json({ message: "No payments found" });
        }
        return res.status(200).json({data: payments});
    }
    catch (error: any) {
        return res.status(500).json({ error: error.message });    
    }
}

   


// Get a payment by ID
export const getPaymentByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "Payment ID is required" });
        }
        const paymentId = parseInt(id, 10);
        if (isNaN(paymentId)) {
            return res.status(400).json({ message: "Invalid payment ID" });
        }
        const payment = await getPaymentByIdService(paymentId);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        return res.status(200).json({ data: payment });
    }
    catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};


// Update a payment by ID
export const updatePaymentController = async (req: Request, res: Response) => {
    try {
        const paymentId = parseInt(req.params.id);
        if (isNaN(paymentId)) {
            return res.status(400).json({ message: "Invalid payment ID" });
        }
        const payment = req.body;


        const existingPayment = await getPaymentByIdService(paymentId);
        if (!existingPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }


        const updatedPayment = await updatePaymentService(paymentId, payment);
        if (!updatedPayment) {
            return res.status(400).json({ message: "Payment not updated successfully" });
        }
        return res.status(200).json({ message: "Payment updated successfully" });
    }
    catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}




// Delete a payment by ID
export const deletePaymentController = async (req: Request, res: Response) => {
    try {
        const paymentId = parseInt(req.params.id);
        if (isNaN(paymentId)) {
            return res.status(400).json({ message: "Invalid payment ID" });
        }
        const existingPayment = await getPaymentByIdService(paymentId);
        if (!existingPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }

const deleted = await deletePaymentService(paymentId);
if (!deleted) {
    return res.status(400).json({ message: "Payment not deleted successfully" });
}
        return res.status(200).json({ message: "Payment deleted successfully" });
    }
    catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

       