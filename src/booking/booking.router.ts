import { Express } from "express"; 
import { createBookingController,getBookingsController ,getBookingByIdController,updateBookingController,deleteBookingController} from "./booking.controller";

const booking = (app: Express) => {

    // Create a new booking
    app.route('/booking').post(
        async (req, res, next) => {
            try {
                await createBookingController(req, res);
            } catch (error) {
                next(error);
            
    
            }
        }
    )


// Get all bookings
app.route('/booking').get(
    async (req, res, next) => {
        try {
            await getBookingsController(req, res);
        } catch (error) {
            next(error);
        }
    }
)




// Get booking by ID
app.route('/booking/:id').get(
    async (req, res, next) => {
        try {
            await getBookingByIdController(req, res);
        } catch (error) {
            next(error);
        }
    }
)


// Update booking by ID
app.route('/booking/:id').put(
    async (req, res, next) => {
        try {
            await updateBookingController(req, res);
        } catch (error) {
            next(error);
        }
    }
)



// Delete booking by ID
app.route('/booking/:id').delete(
    async (req, res, next) => {
        try {
            await deleteBookingController(req, res);
        } catch (error) {
            next(error);
        }
    }
)













}

export default booking;
  