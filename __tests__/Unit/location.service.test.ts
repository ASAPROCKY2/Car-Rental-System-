import {createLocationService,getLocationService,getLocationByIdService,updateLocationService,deleteLocationService} from "../../src/location/location.service"

import db from "../../src/Drizzle/db"
import {LocationTable } from "../../src/Drizzle/schema"



// mock the modules 

jest.mock("../../src/Drizzle/db", () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
       LocationTable: {
            findMany: jest.fn(),
            findFirst: jest.fn()
        }
    }

}))

beforeEach(() => {
    jest.clearAllMocks();
});






// test location creation 

describe(" Location Service", () => {
    describe("createLocationService", () => {
        it("should insert a  Location and return the inserted  Location", async () => {
            const location = {
                locationName: "Test Location",
                address: "123 Main St",
                contactNumber: "1234567890"
            };  // Mock location object to be inserted
            const inserted = { locationID: 1, ...location };
            // chaining
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([inserted])
                })
            });

            const result = await createLocationService(location)
            expect(db.insert).toHaveBeenCalledWith(LocationTable)
            expect(result).toEqual(inserted)
        })


    })





         it("should return null if insertion fails", async () => {
                (db.insert as jest.Mock).mockReturnValue({
                    values: jest.fn().mockReturnValue({
                        returning: jest.fn().mockResolvedValueOnce([null])
                    })
                });
                const location = {
                    locationName: "Fail Location",
                    address: "456 Main St",
                    contactNumber: "0987654321"
                };
    
                const result = await createLocationService(location);
                expect(result).toBeNull();
    
            });
        // test get all locations 
    });








    // test get all locations 

















