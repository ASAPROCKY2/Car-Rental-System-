import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { LocationTable, TILocation } from "../Drizzle/schema";



//Create a new location
  export const createLocationService = async (location: TILocation) => {
    const [inserted]= await db.insert(LocationTable).values(location).returning();
    if (!inserted) {
        return inserted
    }
    return null
}




//Get all locations
export const getLocationService = async () => {
    const locations =await db.query.LocationTable.findMany
    return locations
    
}


// Get location by ID
export const getLocationByIdService = async (id: number) => {
    const location = await db.query.LocationTable.findFirst({
        where: eq(LocationTable.locationID, id)
    })
    return location

}


//update location by ID
export  const updateLocationService= async (id: number, location: TILocation) => {
await db.update(LocationTable).set(location).where(eq(LocationTable.locationID, id))
return "Location updated successfully"



}


//delete location by ID
export const deleteLocationService = async (id: number) => {
    await db.delete(LocationTable).where(eq(LocationTable.locationID, id)).returning()
    return "Location deleted successfully";
}