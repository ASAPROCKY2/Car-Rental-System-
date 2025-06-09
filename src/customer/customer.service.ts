import { eq } from "drizzle-orm";   
import { sql } from "drizzle-orm";
import db from "../Drizzle/db";
import { TICustomer, CustomerTable, BookingsTable, PaymentTable ,CarTable,} from "../Drizzle/schema";





export const getCustomerWithReservations = async (customerID: number) => {
    return await db.query.CustomerTable.findFirst({
        where: eq(CustomerTable.customerID, customerID),
        with: {
            reservations: true 
        }
    })
}



export const getCustomerWithBookings= async (customerID: number) => {

return await db.query.CustomerTable.findFirst({
where:eq(CustomerTable.customerID, customerID),
with: {
            bookings: true
        }
    })
}

































//create a new customer
export const createCustomerService = async (customer: TICustomer) => {
await db.insert(CustomerTable).values(customer);
return "Customer created successfully";
}


//get customer by email
export const getCustomerByEmailService = async (email: string) => {
    return await db.query.CustomerTable.findFirst({
        where: sql`${CustomerTable.email} = ${email}`
    });
}


export const verifyCustomerService = async (email: string) => { 
await db.update (CustomerTable)
.set({ isVerified: true, verificationCode:null})
.where(sql`${CustomerTable.email} = ${email}`);


}




//login a customer
export const customerLoginService = async (customer: TICustomer) => {

    const { email } = customer;
    return await db.query.CustomerTable.findFirst({
        columns: {
            customerID: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            role:true
            
            //password:true
        },
        where: sql`${CustomerTable.email} = ${email}`
    });


}


//Get all customers 
export const getCustomersService = async () => {
const customers = await db.query.CustomerTable.findMany();
return customers;


}





// //delete a Customer 
export const deleteCustomerService= async (id:number)=> {
await db.delete(CustomerTable).where(eq(CustomerTable.customerID,id));
 return "Customer deleted successfully"


 }

//get Customer By ID 
export const getCustomerByIdService= async (id:number)=> {
const customer=await db.query.CustomerTable.findFirst({
    where: eq(CustomerTable.customerID,id)
})

return customer


}







