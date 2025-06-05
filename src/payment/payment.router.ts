import { Express } from 'express';
import { createPaymentController,getPaymentsController,getPaymentByIdController,updatePaymentController,deletePaymentController } from './payment.controller';
import { adminRoleAuth,bothRoleAuth } from '../middleware/bearAuth';
//import isAuthenticated from '../middleware/bearAuth';

const paymentRouter = (app: Express) => {

//create a new payment
    app.route('/payment').post(
        adminRoleAuth,
        async (req,res, next) => {

            try {
                await createPaymentController(req, res);
            } catch (error) {
                next(error);
            }
        }
    )


    // Get all payments
    app.route('/payment').get(
        adminRoleAuth,
        async (req, res, next) => {
            try {
                await getPaymentsController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );





    // Get a payment by ID
    app.route('/payment/:id').get(
        bothRoleAuth,
        async (req, res, next) => {
            try {
                await getPaymentByIdController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );




    // Update a payment by ID
    app.route('/payment/:id').put(
        adminRoleAuth,
        async (req, res, next) => {
            try {
                await updatePaymentController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );



    // Delete a payment by ID
    app.route('/payment/:id').delete(
        adminRoleAuth,
        async (req, res, next) => {
            try {
                await deletePaymentController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );





}
export default paymentRouter;
  