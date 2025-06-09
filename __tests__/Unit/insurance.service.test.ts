import {createInsuranceService,getInsuranceService,getInsuranceByIdService,updateInsuranceService,deleteInsuranceService} from "../../src/insurance/insurance.service"

import db from "../../src/Drizzle/db"
import {InsuranceTable } from "../../src/Drizzle/schema"



// mock the modules 

jest.mock("../../src/Drizzle/db", () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
        InsuranceTable: {
            findMany: jest.fn(),
            findFirst: jest.fn()
        }
    }

}))

beforeEach(() => {
    jest.clearAllMocks();
});





//test create insurance 

describe(" Insurance Service", () => {
    describe("createInsuranceService", () => {
        it("should insert a  insurance and return the inserted  insurance", async () => {
            const  insurance = {
                carID: 1,
                insuranceProvider: "Test Insurance Provider",
                policyNumber: "POL123456",
                startDate: new Date().toISOString(),
                endDate: null
            };  // Mock insurance object to be inserted
            const inserted = { insuranceID: 1, ...insurance };
            // chaining
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([inserted])
                })
            });

            const result = await createInsuranceService( insurance)
            expect(db.insert).toHaveBeenCalledWith(InsuranceTable)
            expect(result).toEqual(inserted)
        })


    })





     it("should return null if insertion fails", async () => {
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([null])
                })
            });
            const insurance = {
                carID: 2,
                insuranceProvider: "Fail Insurance Provider",
                policyNumber: "POL654321",
                startDate: new Date().toISOString(),
                endDate: null
            };

            const result = await createInsuranceService(insurance);
            expect(result).toBeNull();

        })

        //
   
        






    //test get all insurance 



describe("getInsuranceService", () => {
        it("should return all Insurance", async () => {
            const insurance = [
                { id: 1, insuranceName: "Insurance 1", description: "desc 1", customerId: 1, dueDate: new Date() },
                { id: 2, insuranceName: "Insurance 2", description: "desc 2", customerId: 1, dueDate: new Date() }
            ];
            (db.query.InsuranceTable.findMany as jest.Mock).mockResolvedValueOnce(insurance)

            const result = await getInsuranceService()
            expect(result).toEqual(insurance)
        })

        it("should return empty array if no Insurance", async () => {
            (db.query.InsuranceTable.findMany as jest.Mock).mockResolvedValueOnce([])
            const result = await getInsuranceService()
            expect(result).toEqual([])
        })
    })








    //test get insurance by ID 


  describe("getInsuranceService", () => {
        it("should return all Insurance", async () => {
            const insurance = [
                { id: 1, InsuranceName: "Insurance 1", description: "desc 1", customerId: 1, dueDate: new Date() },
                { id: 2, InsuranceName: "Insurance 2", description: "desc 2", customerId: 1, dueDate: new Date() }
            ];
            (db.query.InsuranceTable.findMany as jest.Mock).mockResolvedValueOnce(insurance)

            const result = await getInsuranceService()
            expect(result).toEqual(insurance)
        })

        it("should return empty array if no Insurance", async () => {
            (db.query.InsuranceTable.findMany as jest.Mock).mockResolvedValueOnce([])
            const result = await getInsuranceService()
            expect(result).toEqual([])
        })
    })


























 })













    