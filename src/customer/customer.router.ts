


import { Express } from 'express';
import { createCustomerController, customerLoginController,getCustomerController,getCustomerByIdController,deleteCustomerByIdController } from './customer.controller';
import { getCustomerWithReservationsController } from './customer.controller';
import { getCustomerWithBookingsController } from './customer.controller';




const Customer = (app: Express) => {

   //get customer with payment ID




app.route("/customer/reservation/:id").get(
    async (req, res, next) => {

        try{
            await getCustomerWithBookingsController(req, res);

        }

        catch (error) {     
            next(error);
        }
    }
)



//Get customer with booking ID
app.route("/customer/booking/:id").get(
    async (req, res, next) => {

        try{
            await getCustomerWithBookingsController(req, res);

        }

        catch (error) {     
            next(error);
        }
    }
)











//route
app.route("/auth/register").post(
    async (req, res, next) => {

        try{
            await createCustomerController(req, res);

        }

        catch (error) {
            next(error);
        }
    }
)















//login route
app.route("/auth/login").post(


async(req, res, next)=> {
    try{
        await customerLoginController(req, res);

    } catch (error) {
        next();
    }


}




)




//Get all customers 
app.route('/customer').get(
    async (req, res, next) => {
        try {
            await getCustomerController(req, res);
        } catch (error) {
            next(error);
        }
    }   
)




//Get Customer By ID
app.route('/customer/:id').get(
    async (req, res, next) => {
        try {
            await getCustomerByIdController(req, res);
        } catch (error) {
            next(error);
        }
    }
)




//Delete Customer policy by ID 

app.route('/customer/:id').delete(
    async (req, res, next) => {
        try {
            await deleteCustomerByIdController(req, res);
        } catch (error) {
            next(error)
        }
    }
)




}
export default Customer;

























// import { Express } from 'express';
// import { createCustomerController, getAllCustomersController, getCustomerByIdController, updateCustomerController, deleteCustomerController } from './customer.controller';



// const Customer = (app: Express) => {


//     //create a new customer
//     app.route('/customer').post(
//         async (req, res,next) => {
//             try{
//                 await createCustomerController(req, res);
//             }  
//            catch (error) {
//             next (error)
//               }
//         }
//     )




//     //get all customers
//     app.route('/customer').get(
//         async (req, res,next) => {
//             try{
//                 await getAllCustomersController(req, res);
//             }  
//            catch (error) {
//             next (error)
//               }
//         }
//     );



//     //get customer by id
//     app.route('/customer/:id').get(
//         async (req, res,next) => {
//             try{
//                 await getCustomerByIdController(req, res);
//             }  
//            catch (error) {
//             next (error)
//               }
//         }
//     );




//     //update customer by id
//     app.route('/customer/:id').put(
//         async (req, res,next) => {
//             try{
//                 await updateCustomerController(req, res);
//             }  
//            catch (error) {
//             next (error)
//               }
//         }
//     );




//     //delete customer by id
//     app.route('/customer/:id').delete(
//         async (req, res,next) => {
//             try{
//                 await deleteCustomerController(req, res);
//             }  
//            catch (error) {
//             next (error)
//               }
//         }
//     );

    






























// };

// export default Customer;
