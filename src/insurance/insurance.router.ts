import { Express } from "express";  
import { createInsuranceController, getInsuranceController,getInsuranceByIdController,updateInsuranceController,deleteInsuranceController } from "./insurance.controller";

const insurance = (app: Express) => {

//create new insurance policy
app.route('/insurance').post(
    async (req, res, next) => {
        try {
            await createInsuranceController(req, res);
        } catch (error) {
            next(error);
        }
    }
)




// Get all insurance policies
app.route('/insurance').get(
    async (req, res, next) => {
        try {
            await getInsuranceByIdController(req, res);
        } catch (error) {
            next(error);
        }
    }


)


// Get insurance policy by ID
app.route('/insurance/:id').get(
    async (req, res, next) => {
        try {
            await getInsuranceByIdController(req, res);
        } catch (error) {
            next(error);
        }
    }
)


// Update insurance policy by ID
app.route('/insurance/:id').put(
    async (req, res, next) => {
        try {
            await updateInsuranceController(req, res);
        } catch (error) {
            next(error);
        }
    }
)


// Delete insurance policy by ID
app.route('/insurance/:id').delete(
    async (req, res, next) => {
        try {
            await deleteInsuranceController(req, res);
        } catch (error) {
            next(error)
        }
    }
)




    

}

export default insurance;
