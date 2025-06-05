import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { MaintenanceTable, TIMaintenance } from "../Drizzle/schema";


// Create a new maintenance record
export const createMaintenanceService = async (maintenance: TIMaintenance) => {
    const [inserted] = await db.insert(MaintenanceTable).values(maintenance).returning();
    if (inserted) {
        return inserted;
    }
    return null;
}


// Get all maintenance records
export const getMaintenanceService = async () => {
    const maintenances = await db.query.MaintenanceTable.findMany();
    return maintenances;
}




// Get maintenance record by ID
export const getMaintenanceByIdService = async (id: number) => {
    const maintenance = await db.query.MaintenanceTable.findFirst({
        where: eq(MaintenanceTable.maintenanceID, id)
    });
    return maintenance;
}




// Update maintenance record by ID
export const updateMaintenanceService = async (id: number, maintenance: TIMaintenance) => {
    await db.update(MaintenanceTable).set(maintenance).where(eq(MaintenanceTable.maintenanceID, id));
    return "Maintenance record updated successfully";
}



// Delete maintenance record by ID
export const deleteMaintenanceService = async (id: number) => {
    await db.delete(MaintenanceTable).where(eq(MaintenanceTable.maintenanceID, id)).returning
    return "Maintenance record deleted successfully";
}

