const userService = require('../../src/services/userService');
const userModel = require('../../src/models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('../../src/utils/jwt');
const { generateVerificationToken, sendVerificationEmail, sendPasswordResetEmail } = require('../../src/utils/email');

jest.mock('../../src/models/userModel');
jest.mock('bcryptjs');
jest.mock('../../src/utils/jwt');
jest.mock('../../src/utils/email');

describe('userService Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
      it('should register a new user successfully', async () => {
        bcrypt.hash.mockResolvedValue('hashedPassword');
        userModel.findUserByEmail.mockResolvedValue(null);
        userModel.findUserByUsername.mockResolvedValue(null);
        userModel.registerUser.mockResolvedValue({ _id: 'mockId', username: 'testuser', email: 'test@example.com' });
        generateVerificationToken.mockReturnValue('mockToken');
          sendVerificationEmail.mockResolvedValue();

        const newUser = await userService.register('testuser', 'test@example.com', 'password123');
        expect(newUser).toEqual(
          expect.objectContaining({id: 'mockId', username: 'testuser', email: 'test@example.com'})
        );
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
          expect(sendVerificationEmail).toHaveBeenCalledWith('test@example.com', 'mockToken');
        expect(userModel.registerUser).toHaveBeenCalled();
      });


        it('should throw an error if email exists', async () => {
            userModel.findUserByEmail.mockResolvedValue({ email: 'test@example.com' });
            await expect(userService.register('testuser', 'test@example.com', 'password123')).rejects.toThrow('Email is already in use.');
        });

        it('should throw an error if username already exists', async () => {
            userModel.findUserByEmail.mockResolvedValue(null);
            userModel.findUserByUsername.mockResolvedValue({ username: 'testuser' });
          await expect(userService.register('testuser', 'test2@example.com', 'password123')).rejects.toThrow('Username is already taken.');
        });
        it('should throw an error if registration fails', async () => {
            bcrypt.hash.mockResolvedValue('hashedPassword');
            userModel.findUserByEmail.mockResolvedValue(null);
            userModel.findUserByUsername.mockResolvedValue(null);
            userModel.registerUser.mockRejectedValue(new Error('Database error'));
            generateVerificationToken.mockReturnValue('mockToken');

          await expect(userService.register('testuser', 'test@example.com', 'password123')).rejects.toThrow('Registration failed: Database error');
        });
    });


  describe('login', () => {
        it('should login a user successfully', async () => {
          const mockUser = { _id: 'mockId', username: 'testuser', email: 'test@example.com', password: 'hashedPassword' };
          userModel.findUserByEmail.mockResolvedValue(mockUser);
          bcrypt.compare.mockResolvedValue(true);
          jwt.generateToken.mockReturnValue('mockToken');
          const loggedInUser = await userService.login('test@example.com', 'password123');
            expect(loggedInUser).toEqual({ user: mockUser, token: 'mockToken' });
            expect(userModel.findUserByEmail).toHaveBeenCalledWith('test@example.com');
            expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
          expect(jwt.generateToken).toHaveBeenCalledWith('mockId');
        });

    it('should throw error if email is not found', async () => {
            userModel.findUserByEmail.mockResolvedValue(null);
        await expect(userService.login('test@example.com', 'password123')).rejects.toThrow('Invalid email or password');
        });
    it('should throw error for wrong password', async () => {
      const mockUser = { _id: 'mockId', username: 'testuser', email: 'test@example.com', password: 'hashedPassword' };
          userModel.findUserByEmail.mockResolvedValue(mockUser);
          bcrypt.compare.mockResolvedValue(false);
      await expect(userService.login('test@example.com', 'wrongpassword')).rejects.toThrow('Invalid email or password');
        });
      it('should throw error if login fails', async () => {
          const mockUser = { _id: 'mockId', username: 'testuser', email: 'test@example.com', password: 'hashedPassword' };
          userModel.findUserByEmail.mockResolvedValue(mockUser);
            bcrypt.compare.mockRejectedValue(new Error('Bcrypt error'));
        await expect(userService.login('test@example.com', 'wrongpassword')).rejects.toThrow('Login failed: Bcrypt error');
        });
  });

    describe('getProfile', () => {
        it('should return user profile', async () => {
            const mockUser = { profile: { firstName: 'John', lastName: 'Doe' } };
            const profile = await userService.getProfile(mockUser);
            expect(profile).toEqual({ firstName: 'John', lastName: 'Doe' });
        });
    });


    describe('updateUserProfile', () => {
        it('should update user profile successfully', async () => {
            const mockUpdate = { firstName: 'Updated', lastName: 'User' }
          userModel.updateUserProfile.mockResolvedValue({ id: 'mockId', profile: mockUpdate });
            const updatedUser = await userService.updateUserProfile('mockId', mockUpdate);
           expect(updatedUser).toEqual({ id: 'mockId', profile: mockUpdate });
          expect(userModel.updateUserProfile).toHaveBeenCalledWith('mockId', mockUpdate);
        });

      it('should throw an error if update fails', async () => {
          const mockUpdate = { firstName: 'Updated', lastName: 'User' }
           userModel.updateUserProfile.mockRejectedValue(new Error('Database error'));
         await expect(userService.updateUserProfile('mockId', mockUpdate)).rejects.toThrow('Error updating profile: Database error');
        });
    });

    describe('updateUserSettings', () => {
        it('should update user settings successfully', async () => {
            const mockUpdate = { language: 'fr', theme: 'dark' }
          userModel.updateUserSettings.mockResolvedValue({ id: 'mockId', settings: mockUpdate });
          const updatedSettings = await userService.updateUserSettings('mockId', mockUpdate);
          expect(updatedSettings).toEqual({ id: 'mockId', settings: mockUpdate });
            expect(userModel.updateUserSettings).toHaveBeenCalledWith('mockId', mockUpdate);
        });
        it('should throw an error if update settings fails', async () => {
             const mockUpdate = { language: 'fr', theme: 'dark' }
            userModel.updateUserSettings.mockRejectedValue(new Error('Database error'));
          await expect(userService.updateUserSettings('mockId', mockUpdate)).rejects.toThrow('Error updating settings: Database error');
        });
    });

    describe('deleteUserAccount', () => {
        it('should delete the user account', async () => {
          userModel.deleteUserAccount.mockResolvedValue();
          await userService.deleteUserAccount('mockId');
          expect(userModel.deleteUserAccount).toHaveBeenCalledWith('mockId');
        });
        it('should throw an error if deleting fails', async () => {
            userModel.deleteUserAccount.mockRejectedValue(new Error('Database error'));
          await expect(userService.deleteUserAccount('mockId')).rejects.toThrow('Error deleting user account: Database error');
        });
    });

  describe('getAccountStatus', () => {
      it('should return the account status', async () => {
          const mockUser = { status: { isMailVerified: false } };
          const status = await userService.getAccountStatus(mockUser);
          expect(status).toEqual({ isMailVerified: false });
      });
    });

  describe('verifyEmail', () => {
        it('should verify the email successfully', async () => {
            const mockUser = { _id: 'mockId', status: { isMailVerified: false }};
            userModel.findUserByToken.mockResolvedValue(mockUser);
            userModel.updateUserTokenStatus.mockResolvedValue();
            userModel.updateUserStatus.mockResolvedValue({ id: 'mockId', status: { isMailVerified: true }});

            const verifiedUser = await userService.verifyEmail('mockToken');
           expect(verifiedUser).toEqual({ id: 'mockId', status: { isMailVerified: true }});
           expect(userModel.findUserByToken).toHaveBeenCalledWith('mockToken');
            expect(userModel.updateUserTokenStatus).toHaveBeenCalledWith('mockId', { emailVerificationUsed: true });
          expect(userModel.updateUserStatus).toHaveBeenCalledWith('mockId', { isMailVerified: true });
        });
       it('should throw an error if user not found', async () => {
            userModel.findUserByToken.mockResolvedValue(null);
            await expect(userService.verifyEmail('mockToken')).rejects.toThrow('Invalid or expired verification token');
        });
    it('should throw an error if email is already verified', async () => {
        userModel.findUserByToken.mockResolvedValue({ status: { isMailVerified: true }});
        await expect(userService.verifyEmail('mockToken')).rejects.toThrow('Email is already verified.');
      });
    });

  describe('changePassword', () => {
      it('should change password successfully', async () => {
        const mockUser = { _id: 'mockId', password: 'hashedPassword' };
        bcrypt.compare.mockResolvedValue(true);
        bcrypt.hash.mockResolvedValue('newHashedPassword');
          userModel.updateUserPassword.mockResolvedValue({ id: 'mockId', password: 'newHashedPassword' });

          const updatedUser = await userService.changePassword(mockUser, 'currentPassword', 'newPassword');
          expect(updatedUser).toEqual({ id: 'mockId', password: 'newHashedPassword' });
          expect(bcrypt.compare).toHaveBeenCalledWith('currentPassword', 'hashedPassword');
        expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10);
        expect(userModel.updateUserPassword).toHaveBeenCalledWith('mockId', 'newHashedPassword');
      });
        it('should throw an error if password compare fails', async () => {
            const mockUser = { _id: 'mockId', password: 'hashedPassword' };
            bcrypt.compare.mockResolvedValue(false);
          await expect(userService.changePassword(mockUser, 'currentPassword', 'newPassword')).rejects.toThrow('Current password is incorrect');
      });
    it('should throw an error if change password fails', async () => {
            const mockUser = { _id: 'mockId', password: 'hashedPassword' };
            bcrypt.compare.mockResolvedValue(true);
            bcrypt.hash.mockResolvedValue('newHashedPassword');
          userModel.updateUserPassword.mockRejectedValue(new Error('Database error'));
          await expect(userService.changePassword(mockUser, 'currentPassword', 'newPassword')).rejects.toThrow('Error changing password: Database error');
    });
  });

  describe('requestPasswordReset', () => {
      it('should request a password reset successfully', async () => {
          const mockUser = { _id: 'mockId', email: 'test@example.com' };
          userModel.findUserByEmail.mockResolvedValue(mockUser);
          generateVerificationToken.mockReturnValue('mockResetToken');
        userModel.updateUserPasswordResetToken.mockResolvedValue();
        sendPasswordResetEmail.mockResolvedValue();


          await userService.requestPasswordReset('test@example.com');
            expect(userModel.findUserByEmail).toHaveBeenCalledWith('test@example.com');
            expect(generateVerificationToken).toHaveBeenCalled();
            expect(userModel.updateUserPasswordResetToken).toHaveBeenCalledWith('mockId', 'mockResetToken');
          expect(sendPasswordResetEmail).toHaveBeenCalledWith('test@example.com', 'mockResetToken')
        });

        it('should throw an error if user not found', async () => {
            userModel.findUserByEmail.mockResolvedValue(null);
          await expect(userService.requestPasswordReset('test@example.com')).rejects.toThrow('User not found');
      });
    it('should throw an error if request fails', async () => {
        const mockUser = { _id: 'mockId', email: 'test@example.com' };
            userModel.findUserByEmail.mockResolvedValue(mockUser);
            generateVerificationToken.mockReturnValue('mockResetToken');
           userModel.updateUserPasswordResetToken.mockRejectedValue(new Error('Database error'));
          await expect(userService.requestPasswordReset('test@example.com')).rejects.toThrow('Error requesting password reset: Database error');
        });
    });

  describe('resetPassword', () => {
      it('should reset password successfully', async () => {
        const mockUser = { _id: 'mockId', password: 'oldHashedPassword'};
        userModel.findUserByPasswordResetToken.mockResolvedValue(mockUser);
        bcrypt.hash.mockResolvedValue('newHashedPassword');
          userModel.updateUserPassword.mockResolvedValue({ id: 'mockId', password: 'newHashedPassword' });
          userModel.updateUserPasswordResetToken.mockResolvedValue();

        await userService.resetPassword('mockToken', 'newPassword');
          expect(userModel.findUserByPasswordResetToken).toHaveBeenCalledWith('mockToken');
        expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10);
          expect(userModel.updateUserPassword).toHaveBeenCalledWith('mockId', 'newHashedPassword');
           expect(userModel.updateUserPasswordResetToken).toHaveBeenCalledWith('mockId', null);
      });
      it('should throw error if token is invalid', async () => {
          userModel.findUserByPasswordResetToken.mockResolvedValue(null);
        await expect(userService.resetPassword('mockToken', 'newPassword')).rejects.toThrow('Invalid or expired password reset token');
      });
      it('should throw error if reset fails', async () => {
          const mockUser = { _id: 'mockId', password: 'oldHashedPassword'};
            userModel.findUserByPasswordResetToken.mockResolvedValue(mockUser);
           bcrypt.hash.mockResolvedValue('newHashedPassword');
        userModel.updateUserPassword.mockRejectedValue(new Error('Database error'))
           await expect(userService.resetPassword('mockToken', 'newPassword')).rejects.toThrow('Error resetting password: Database error');
      });
  });
});