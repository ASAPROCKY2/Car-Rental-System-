import { Request, Response } from "express";
import { createLocationService,getLocationService,getLocationByIdService,updateLocationService,deleteLocationService } from "./location.service";


// Create a new location
export const createLocationController = async (req: Request, res: Response) => {
    try {
        const location = req.body;

        if (location.dueDate) {
            location.dueDate = new Date(location.dueDate);
        }

        const newLocation = await createLocationService(location);
        if (!newLocation) {
            return res.status(201).json({ message: "Location creation Successfully" });
        }

        return res.status(201).json({ message: "Location created successfully", location: newLocation });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}


// Get all locations
export const getLocationController = async (_: Request, res: Response) => {
  try {
const locations = await getLocationService()
    if (!locations || locations.length === 0) {
      return res.status(404).json({ message: "No locations found" });
    }
    return res.status(200).json({ data:locations });



    
  } catch (error: any) {
    return res.status(500).json({ error: error.message });  
    
  }
  
    
  }



   // Get location by ID
   export const getLocationByIdController = async (req: Request, res: Response) => {
try {

const id = parseInt(req.params.id,)
if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid location ID" })
    }

    const location = await getLocationByIdService(id)
    if (!location) {
        return res.status(404).json({ message: "Location not found" })
    }   
return res.status(200).json({ data: location });


    
} catch (error: any) {
    return res.status(500).json({ error: error.message });
    
}

   }
  

// Update location by ID
export const updateLocationController= async (req: Request, res: Response) => {
try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid location ID" })
    }
    const location = req.body;
    
     if (location.dueDate) {
            location.dueDate = new Date(location.dueDate)
        }


        const existingLocation = await getLocationByIdService(id)
    if (!existingLocation) {
        return res.status(404).json({ message: "Location not found" })

    }

    const updatedLocation = await updateLocationService(id, location)
    if (!updatedLocation) {
        return res.status(400).json({ message: "Location update failed" })
    }
    return res.status(200).json({ message: "Location updated successfully" })




} catch (error: any) {
    return res.status(500).json({ error: error.message });
    
}



}




// Delete location by ID
export const deleteLocationController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid location ID" });
        }

        const existingLocation = await getLocationByIdService(id);
        if (!existingLocation) {
            return res.status(404).json({ message: "Location not found" });
        }

        const deleted= await deleteLocationService(id);
        if (!deleted) {
            return res.status(400).json({ message: "Location deletion failed" });
        }
        return res.status(204).json({ message: "Location deleted successfully" });

        

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
        
    }
}