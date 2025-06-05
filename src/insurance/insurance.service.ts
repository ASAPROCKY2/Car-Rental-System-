import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { InsuranceTable, TIInsurance } from "../Drizzle/schema";

// Create a new insurance policy
export const createInsuranceService = async (insurance: TIInsurance) => {
  const [inserted] = await db.insert(InsuranceTable).values(insurance).returning();
  if (inserted) {
    return inserted;
  }
  return null;
}

// Get all insurance policies
export const getInsuranceService = async () => {
    const insurances = await db.query.InsuranceTable.findMany();
    return insurances;

}


//get insurance by id
export const getInsuranceByIdService = async (id: number) => {
const insurance=await db.query.InsuranceTable.findFirst({
    where: eq(InsuranceTable.insuranceID, id)
})
return insurance
}


//update insurance by id
export const updateInsuranceService = async (id: number, todo: TIInsurance) => {
    await db.update(InsuranceTable).set(todo).where(eq(InsuranceTable.insuranceID, id))
    return "Todo updated successfully";
}


//delete insurance by id
export const deleteInsuranceService = async (id: number) => {
    await db.delete(InsuranceTable).where(eq(InsuranceTable.insuranceID, id));
    return "Insurance policy deleted successfully";
}