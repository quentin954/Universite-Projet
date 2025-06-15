const adminService = require('../../src/services/adminService');
const userModel = require('../../src/models/userModel');

jest.mock('../../src/models/userModel');

describe('adminService Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllUsers', () => {
        it('should fetch all users successfully', async () => {
            const mockUsers = [{ _id: 'mockId1', email: 'test1@example.com' }, { _id: 'mockId2', email: 'test2@example.com' }];
            userModel.getAllUsers.mockResolvedValue(mockUsers);

            const users = await adminService.getAllUsers();
            expect(users).toEqual(mockUsers);
            expect(userModel.getAllUsers).toHaveBeenCalled();
        });

        it('should throw an error if fetching all users fails', async () => {
            userModel.getAllUsers.mockRejectedValue(new Error('Database error'));
            await expect(adminService.getAllUsers()).rejects.toThrow('Error fetching users: Database error');
        });
    });

    describe('deleteUser', () => {
        it('should delete a user successfully', async () => {
          userModel.deleteUser.mockResolvedValue();
            await adminService.deleteUser('mockId');
            expect(userModel.deleteUser).toHaveBeenCalledWith('mockId');
        });

        it('should throw an error if deleting a user fails', async () => {
          userModel.deleteUser.mockRejectedValue(new Error('Database error'));
          await expect(adminService.deleteUser('mockId')).rejects.toThrow('Error deleting user: Database error');
        });
    });
});