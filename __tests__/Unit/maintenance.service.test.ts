import {createMaintenanceService,getMaintenanceService,getMaintenanceByIdService,updateMaintenanceService,deleteMaintenanceService} from "../../src/mantenance/maintenance.service"
import db from "../../src/Drizzle/db"
import { MaintenanceTable } from "../../src/Drizzle/schema"


//mock the modules 
jest.mock("../../src/Drizzle/db", () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
        MaintenanceTable: {
            findMany: jest.fn(),
            findFirst: jest.fn()
        }
    }

}))

beforeEach(() => {
    jest.clearAllMocks();
});


//test create maintenance 

describe("Maintenance Service", () => {
    describe("createMaintenanceService", () => {
        it("should insert a Maintenance and return the inserted Maintenance", async () => {
            const Maintenance = {
                carID: 1,
                maintenanceDate: new Date().toISOString(),
                description: "desc",
                cost: "100"
            };  // Mock maintenance object to be inserted
            const inserted = { id: 1, ...Maintenance };
            // chaining
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([inserted])
                })
            });

            const result = await createMaintenanceService(Maintenance)
            expect(db.insert).toHaveBeenCalledWith(MaintenanceTable)
            expect(result).toEqual(inserted)
        })


        it("should return null if insertion fails", async () => {
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([null])
                })
            })

            const maintenance = {
                carID: 2,
                maintenanceDate: new Date().toISOString(),
                description: "desc",
                cost: "200"
            };

            const result = await createMaintenanceService(maintenance);
            expect(result).toBeNull()

        })

        //
    })




//test get all maintenance 

describe("getMaintenanceService", () => {
        it("should return all Maintenance", async () => {
            const maintenance = [
                { id: 1, maintenanceName: "Maintenance 1", description: "desc 1", userId: 1, dueDate: new Date() },
                { id: 2, maintenanceName: "Maintenance 2", description: "desc 2", userId: 1, dueDate: new Date() }
            ];
            (db.query.MaintenanceTable.findMany as jest.Mock).mockResolvedValueOnce(maintenance)

            const result = await getMaintenanceService()
            expect(result).toEqual(maintenance)
        })

        it("should return empty array if no todos", async () => {
            (db.query.MaintenanceTable.findMany as jest.Mock).mockResolvedValueOnce([])
            const result = await getMaintenanceService()
            expect(result).toEqual([])
        })
    })







    //test get maintenance by ID 

describe("getMaintenanceByIdService", () => {
        it("should return a Maintenance if found", async () => {
            const maintenance = {
                id: 1,
                maintenanceName: "Maintenance 1",
                description: "desc",
                customerID: 1,
                dueDate: new Date()
            };
            (db.query.MaintenanceTable.findFirst as jest.Mock).mockResolvedValueOnce(maintenance)

            const result = await getMaintenanceByIdService(1)
            expect(db.query.MaintenanceTable.findFirst).toHaveBeenCalled()
            expect(result).toEqual(maintenance)
        })

        it("should return undefined if not found", async () => {
            (db.query.MaintenanceTable.findFirst as jest.Mock).mockResolvedValueOnce(undefined)
            const result = await getMaintenanceByIdService(9999)
            expect(result).toBeUndefined()
        })


    })





    //test update Maintenance 



// describe("updateMaintenanceService", () => {
//         it("should update a maintenance and return success message", async () => {
//             (db.update as jest.Mock).mockReturnValue({
//                 set: jest.fn().mockReturnValue({
//                     where: jest.fn().mockResolvedValueOnce({ rowCount: 1 })
//                 })
//             })

//             const result = await updateMaintenanceService(1, {
//                 carID: 1,
//                 maintenanceDate: new Date().toISOString(),
//                 description: "Updated Desc",
//                 cost: "100"
//             })

//             expect(db.update).toHaveBeenCalledWith(MaintenanceTable)
//             expect(result).toBe("Maintenance updated successfully")
//         })
//     })











})