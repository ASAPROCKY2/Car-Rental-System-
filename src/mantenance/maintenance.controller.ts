import { Request, Response } from "express";
import { createMaintenanceService ,getMaintenanceService,getMaintenanceByIdService ,updateMaintenanceService,deleteMaintenanceService } from "./maintenance.service";

// Create a new maintenance record
export const createMaintenanceController = async (req: Request, res: Response) => {
    try {
        const maintenance = req.body;

//convert due date to Date object
        if (maintenance.dueDate) {
            maintenance.dueDate = new Date(maintenance.dueDate);
        }




        const newMaintenance = await createMaintenanceService(maintenance);

        if (!newMaintenance) {
            return res.status(400).json({ message: "Maintenance record not created" });
        }
        return res.status(201).json({ message: "Maintenance record created successfully", maintenance: newMaintenance });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};  


// Get all maintenance records
export const getMaintenanceController = async (req: Request, res: Response) => {
    try {
        const maintenances = await getMaintenanceService();
        if (!maintenances || maintenances.length === 0) {
            return res.status(404).json({ message: "No maintenance records found" });
        }
        return res.status(200).json({ data: maintenances });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};




// Get maintenance record by ID
export const getMaintenanceByIdController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid maintenance ID" });
        }

        const maintenance = await getMaintenanceByIdService(id);
        if (!maintenance) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }

        return res.status(200).json({ data: maintenance });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};




// Update maintenance record by ID
export const updateMaintenanceController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid maintenance ID" });
        }

        const maintenance = req.body;

        //convert due date to Date object
        if (maintenance.dueDate) {
            maintenance.dueDate = new Date(maintenance.dueDate);
        }

        const existingMaintenance = await getMaintenanceByIdService(id);
        if (!existingMaintenance) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }

        const updatedMaintenance = await updateMaintenanceService(id, maintenance);
        if (!updatedMaintenance) {
            return res.status(400).json({ message: "Maintenance record not updated" })

        }
        
        return res.status(200).json({ message: "Maintenance record updated successfully"})

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}


// Delete maintenance record by ID
export const deleteMaintenanceController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid maintenance ID" });
        }

        const existingMaintenance = await getMaintenanceByIdService(id);
        if (!existingMaintenance) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }

        const deleted= await deleteMaintenanceService(id);
        if (!deleted) {
            return res.status(400).json({ message: "Maintenance record not deleted" });
        }
        return res.status(204).json({ message: "Maintenance record deleted successfully" });
    }
    catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}