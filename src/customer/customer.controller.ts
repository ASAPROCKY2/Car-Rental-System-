import { Request, Response } from "express";
import {
  createCustomerService,
  customerLoginService,
  getCustomersService,
  getCustomerByIdService,
  deleteCustomerService,
  getCustomerWithBookings,
} from "./customer.service";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Mailer/mailer"; 

import {getCustomerWithReservations}  from "./customer.service";





export const getCustomerWithReservationsController = async (req: Request, res: Response) => {
  try {
    const customerID = parseInt(req.params.id);

    if (isNaN(customerID)) {
      return res.status(400).json({ error: "Invalid customer ID" });
    }

    const customer: any = await getCustomerWithReservations(customerID);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found or no reservations available." });
    }

    return res.status(200).json({ data: customer });
  } catch (error) {
    console.error("Error in getCustomerWithReservationsController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};







export const getCustomerWithBookingsController = async (req: Request, res: Response) => {
  try {
    const customerID = parseInt(req.params.id);

    if (isNaN(customerID)) {
      return res.status(400).json({ error: "Invalid customer ID" });
    }

    const customer: any = await getCustomerWithBookings(customerID);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found or no bookings available." });
    }

    return res.status(200).json({ data: customer });
  } catch (error) {
    console.error("Error in getBookingWithReservationsController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};




















































// Create a new customer
export const createCustomerController = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const password = user.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    user.isVerified = false;

    const createdCustomer = await createCustomerService(user);
    if (!createdCustomer) {
      return res.status(400).json({ message: "Customer not created successfully" });
    }

     try {
            await sendEmail(
                user.email,
                "Verify your account",
                `Hello ${user.lastName}, your verification code is: ${verificationCode}`,
                `<div>
                <h2>Hello ${user.lastName},</h2>
                <p>Your verification code is: <strong>${verificationCode}</strong></p>
                 <p>Enter this code to verify your account.</p>
                </div>`
            );
        } catch (emailError) {
            console.error("Failed to send registration email:", emailError);
        }
        return res.status(201).json({ message: "User created. Verification code sent to email." })
    } catch (err) {
      console.error("Failed to send registration email:", err);
    }
}

// Login a customer
export const customerLoginController = async (req: Request, res: Response) => {
  try {
    const customer = req.body;
    const customerExists = await customerLoginService(customer);
    if (!customerExists) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const userMatch = await bcrypt.compare(customer.password, customerExists.password);
    if (!userMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      sub: customerExists.customerID,
      customer_id: customerExists.customerID,
      first_name: customerExists.firstName,
      Last_name: customerExists.lastName,
      role: customerExists.role,
      exp: Math.floor(Date.now() / 1000) + 60,
    };

    const secret = process.env.JWT_SECRET as string;
    if (!secret) {
      throw new Error("JWT secret is not defined");
    }

    const token = jwt.sign(payload, secret);

    return res.status(200).json({
      message: "Login successful",
      token,
      customer: {
        customer_id: customerExists.customerID,
        first_name: customerExists.firstName,
        last_name: customerExists.lastName,
        email: customerExists.email,
        role: customerExists.role,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all customers
export const getCustomerController = async (req: Request, res: Response) => {
  try {
    const customers = await getCustomersService();
    if (!customers || customers.length === 0) {
      return res.status(404).json({ message: "No customers found" });
    }

    return res.status(200).json({ data: customers });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Get customer by ID
export const getCustomerByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Customer ID" });
    }

    const customer = await getCustomerByIdService(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ data: customer });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete customer by ID
export const deleteCustomerByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Customer ID" });
    }

    const existingCustomer = await getCustomerByIdService(id);
    if (!existingCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const deletedCustomer = await deleteCustomerService(id);
    if (!deletedCustomer) {
      return res.status(400).json({ message: "Customer not deleted" });
    }

    return res.status(204).json({ message: "Customer deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
