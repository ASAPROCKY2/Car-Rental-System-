import { createCustomerService, customerLoginService } from "../../src/customer/customer.service"
import db from "../../src/Drizzle/db"
import { TICustomer } from "../../src/Drizzle/schema"
//import { TICustomer } from "../../src/Drizzle/schema"



jest.mock("../../src/Drizzle/db", () => ({
    __esModule: true,
    default: {
        insert: jest.fn(() => ({
            values: jest.fn().mockReturnThis()
        })),
        query: {
            CustomerTable: {
                findFirst: jest.fn()
            }
        }
    }
}))


describe("Auth Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })


    describe("createCustomerService", () => {
        it('should insert a customer and return success message', async () => {
            const  customer = {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@mail.com',
                password: 'hashed'
            };
            const result = await createCustomerService(customer)
            expect(db.insert).toHaveBeenCalled()
            expect(result).toBe("Customer created successfully")
        })
        })  
    
        


    //test login 
    describe('customerLoginService', () => {
        it("should return user data if found", async () => {
            const mockCustomer = {
                id: 1,
                firstName: 'Test',
                lastName: 'User',
                email: 'test@mail.com',
                password: 'hashed'
            };

(db.query.CustomerTable.findFirst as jest.Mock).mockResolvedValueOnce(mockCustomer)

    const result = await customerLoginService({ email: 'test@mail.com' } as TICustomer)
    expect(db.query.CustomerTable.findFirst).toHaveBeenCalled()
    expect(result).toEqual(mockCustomer)
        })


        it('should return null if user not found', async () => {
            (db.query.CustomerTable.findFirst as jest.Mock).mockResolvedValueOnce(null)

            const result = await customerLoginService({ email: 'test@mail.com' } as TICustomer)
            expect(db.query.CustomerTable.findFirst).toHaveBeenCalled()
            expect(result).toBeNull()
        })






    })




    })












