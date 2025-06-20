import { Express } from 'express';
import { createCarController ,getCarController ,getCarByIdController,updateCarController,deleteCarController} from './car.controller';

const car= (app: Express) => {

// Create a new car

app.route('/car').post(
        async (req, res, next) => {
            try {
                await createCarController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )


// Get all cars
app.route('/car').get(
        async (req, res, next) => {
            try {
                await getCarController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )



    //get car by id
app.route('/car/:id').get(
        async (req, res, next) => {
            try {
                await getCarByIdController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )




    //update car by id
app.route('/car/:id').put(
        async (req, res, next) => {
            try {
                await updateCarController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )
    
// Delete car by ID
app.route('/car/:id').delete(
        async (req, res, next) => {
            try {
                await deleteCarController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )










}

export default car;