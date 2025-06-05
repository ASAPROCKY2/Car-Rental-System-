import { Express } from 'express';
import { createLocationController,getLocationController,getLocationByIdController ,updateLocationController,deleteLocationController} from './location.controller';

const location = (app: Express) => {

    // Create a new location
    app.route('/location').post(
        async (req, res, next) => {
            try {
                await createLocationController(req, res);
                next();
            } catch (error) {
                next(error);
            }
        }
    )


    // Get all locations
    app.route('/location').get(
        async (req, res,next) => {
            try {
                await getLocationController(req, res);
            } catch (error) {
                next(error);
            }
        }
    )



    //get location by id
    app.route('/location/:id').get(
        async (req, res,next) => {
            try {
                await getLocationByIdController(req, res);
            } catch (error) {
                next(error);
            }
        }
    )


    //update location by id
    app.route('/location/:id').put(
        async (req, res,next) => {
            try {
                await updateLocationController(req, res)
            } catch (error) {
                next(error);
            }
        }
    )




// Delete location by ID
app.route('/location/:id').delete(
    async (req, res, next) => {
        try {
            await deleteLocationController(req, res);
        } catch (error) {
            next(error);
        }
    }
)












}
export default location;