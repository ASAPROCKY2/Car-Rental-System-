import {Request, Response } from "express";
import { createInsuranceService,getInsuranceService ,getInsuranceByIdService ,updateInsuranceService ,deleteInsuranceService} from "./insurance.service";

// Create a new insurance policy
export const createInsuranceController = async (req: Request, res: Response) => {
    try {
        const insurance = req.body;

        const newInsurance = await createInsuranceService(insurance);

        if (!newInsurance) {
            return res.status(400).json({ message: "Insurance policy not created" });
        }
        return res.status(201).json({ message: "Insurance policy created successfully", insurance: newInsurance });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};


// Get all insurance policies
export const getInsuranceController= async (req: Request, res: Response) => {
    try {
        const insurances = await getInsuranceService()
        if (!insurances || insurances.length === 0) {
            return res.status(404).json({ message: "No insurance policies found" });
        }
        return res.status(200).json({ data: insurances });
        
    } catch (error) {
        
    }
}



// Get insurance policy by ID
export const getInsuranceByIdController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid insurance ID" });
        }

        const insurance = await getInsuranceByIdService(id);
        if (!insurance) {
            return res.status(404).json({ message: "Insurance policy not found" });
        }

        return res.status(200).json({ data: insurance });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};



//update insurance policy by ID
export const updateInsuranceController = async (req: Request, res: Response) => {
try {
const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid insurance ID" });
    }
    
const insurance = req.body;
if (insurance.dueDate) {
            insurance.dueDate = new Date(insurance.dueDate);
        }

//check if insurance exists
const existingInsurance = await getInsuranceByIdService(id);
if (!existingInsurance) {
    return res.status(404).json({ message: "Insurance policy not found" });

}

const updatedInsurance = await updateInsuranceService(id, insurance)
if (!updatedInsurance) {
    return res.status(400).json({ message: "Insurance policy not updated" });

}
return res.status(200).json({ message: "Insurance policy updated successfully", insurance: updatedInsurance });

}catch (error: any) {
    return res.status(500).json({ error: error.message });


}
}


// Delete insurance policy by ID
export const deleteInsuranceController = async (req: Request, res: Response) => {
try {
const id = parseInt(req.params.id);
if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid insurance ID" });
}
const existingInsurance = await getInsuranceByIdService(id);
if (!existingInsurance) {
    return res.status(404).json({ message: "Insurance policy not found" });
}
const deletedInsurance = await deleteInsuranceService(id);
if (!deletedInsurance) {
    return res.status(400).json({ message: "Insurance policy not deleted" });
}
return res.status(204).json({ message: "Insurance policy deleted successfully" });


} catch (error: any) {
    return res.status(500).json({ error: error.message });
    
}

}

