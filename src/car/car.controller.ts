import { Request, Response } from "express";
import { createCarService,getCarService ,getCarByIdService,updateCarService,deleteCarService} from "./car.service";

// Create a new car
export const createCarController = async (req: Request, res: Response) => {
    try {
        const car = req.body
        const createdCar = await createCarService(car)
        if (createdCar) {
            return res.status(201).json(createdCar)
        }
        return res.status(400).json({ message: "Failed to create car" })
    } catch (error: any) {
        
        return res.status(500).json({ error: error.message  });
    }
}


//Get all cars
export const getCarController =async (req: Request, res: Response) => {
    try {
        const cars = await getCarService()
        if( !cars || cars.length === 0) {
            return res.status(404).json({ message: "No cars found" })

        }
        return res.status(200).json({data: cars})




    } catch (error: any) {
        return res.status(500).json({ error: error.message });
        
    }
}


// Get car by ID
export const getCarByIdController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid car ID" });
        }
        const car = await getCarByIdService(id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        return res.status(200).json({ data: car });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}




// Update car by ID
export const updateCarController =async (req: Request, res: Response) => {

try {
const id = parseInt(req.params.id);
if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid car ID" });

}
const car = req.body;

if (car.dueDate) {
            car.dueDate = new Date(car.dueDate)
        }


//checking if car exists
const existingCar = await getCarByIdService(id)
if (!existingCar) {
    return res.status(404).json({ message: "Car not found" })
}
const updatedCar = await updateCarService(id, car);
if (!updatedCar) {
    return res.status(400).json({ message: "Failed to update car" })
}
return res.status(200).json({ message: "Car updated successfully" });


} catch (error: any) {
    return res.status(500).json({ error: error.message });
    
}

}


// Delete car by ID
export const deleteCarController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid car ID" });
        }

        const existingCar = await getCarByIdService(id);
        if (!existingCar) {
            return res.status(404).json({ message: "Car not found" });
        }




        const deleted = await deleteCarService(id);
        if (!deleted) {
            return res.status(404).json({ message: "Car not found" });
        }
        return res.status(200).json({ message: "Car deleted successfully" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}


