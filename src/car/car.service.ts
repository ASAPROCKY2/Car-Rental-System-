import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { CarTable, TICar } from "../Drizzle/schema";

//create a new car
export const createCarService = async (car: TICar) => {
    const [inserted] = await db.insert(CarTable).values(car).returning()
    if (inserted) {
        return inserted;
    }
    return null
}


// Get all cars
export const getCarService = async () => {
    const cars=await db.query.CarTable.findMany()
    return cars
}


// Get car by ID
export const getCarByIdService = async (id: number) => {
    const car = await db.query.CarTable.findFirst({
        where: eq(CarTable.carID, id)
    })

    return car
}



// Update car by ID
export const updateCarService = async (id: number, car: TICar) => {
    await db.update(CarTable).set(car).where(eq(CarTable.carID, id))

return  "Car updated successfully";
}


// Delete car by ID
export const deleteCarService = async (id: number) => {
    await db.delete(CarTable).where(eq(CarTable.carID, id)).returning()
    return "Car deleted successfully";
}   

