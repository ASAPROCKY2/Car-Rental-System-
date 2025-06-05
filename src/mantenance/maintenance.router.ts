import { Express } from 'express';
import { createMaintenanceController,getMaintenanceController ,getMaintenanceByIdController,updateMaintenanceController,deleteMaintenanceController} from './maintenance.controller';


const maintenance = (app: Express) => {

//create new maintenance record
    app.route('/maintenance').post(
        async (req, res, next) => {
            try {
                await createMaintenanceController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    


// Get all maintenance records
app.route('/maintenance').get(
    async (req, res, next) => {
        try {
            await getMaintenanceController(req, res);
        } catch (error) {
            next(error);
        }
    }
);


// Get maintenance record by ID
app.route('/maintenance/:id').get(
    async (req, res, next) => {
        try {
            await getMaintenanceByIdController(req, res);
        } catch (error) {
            next(error);
        }
    }
);



// Update maintenance record by ID
app.route('/maintenance/:id').put(
    async (req, res, next) => {
        try {
            await updateMaintenanceController(req, res);
        } catch (error) {
            next(error);
        }
    }
);




// Delete maintenance record by ID
app.route('/maintenance/:id').delete(
    async (req, res, next) => {
        try {
            await deleteMaintenanceController(req, res);
        } catch (error) {
            next(error);
        }
    }
)
















}

export default maintenance;