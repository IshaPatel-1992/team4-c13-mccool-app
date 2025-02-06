import bcrypt from 'bcrypt';
import DataAccess from '../src/databaseAccess/dataAccess';
import IUsers from '../src/interface/IUsers';
import UsersModel from '../src/models/UsersModel';

describe('dataAccess.insertOne', () => {
  const dbInstance = new DataAccess<IUsers>(UsersModel);

  it('should insert a user into the database', async () => {
    const dataU: Partial<IUsers> = {
      name: "Megha Patel",
      email: "meghapatel1994@gmail.com",
      password: "$2b$10$A9PbBq7bBlUOw1m7JhHj6uJhTzoDqEFxkER6w3q/pk6V1S6KlfL7P",  // Example hashed password
      authProvider: "manual",
      oauthId: null,
      role: "user",
    };

    const result = await dbInstance.insertOne(dataU);

    // Test if the user was inserted correctly
    expect(result).toHaveProperty('name', dataU.name);
    expect(result.name).toBe(dataU.name);
    expect(result).toHaveProperty('email', dataU.email);
    expect(result.email).toBe(dataU.email);
    expect(result).toHaveProperty('authProvider', dataU.authProvider);
    expect(result.authProvider).toBe(dataU.authProvider);

    // Check if the password exists before comparing it
    if (result.password) {
      const isPasswordCorrect = await bcrypt.compare(dataU.password, result.password);
      expect(isPasswordCorrect).toBe(true);  // The password should match the hashed version
    } else {
      throw new Error('Password is undefined in the result');
    }
  });
});
