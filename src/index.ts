import express from 'express';
import insurance from './insurance/insurance.router';
import car from './car/car.router';
import location from './location/location.router';  
import booking from './booking/booking.router';
import maintenance from './mantenance/maintenance.router';  
import reservation from './reservation/reservation.router';
import payment from './payment/payment.router';
import customer from './customer/customer.router';

const app = express();
app.use(express.json());

insurance(app);
car(app);
location(app);
booking(app);
maintenance(app);
reservation(app);
payment(app);
customer(app);



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8081, () => {
    console.log('Server is running on http://localhost:8081');
});
