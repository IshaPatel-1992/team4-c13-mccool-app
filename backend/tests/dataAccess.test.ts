import dataAccess from '../src/databaseAccess/dataAccess';
import ItestUser from '../src/interface/ItestUser';
import testUserModel from '../src/models/testUserModel';

describe('dataAccess.insertOne', () => {

  const dbInstance = new dataAccess<ItestUser>(testUserModel);

  it('should insert a user into the database', async () => {
    const data = {
      name: 'John Doe jr5',
      age: 13,
      email: 'jr5doe@somedomain.com'
    };
    const result = await dbInstance.insertOne(data);
    expect(result).toHaveProperty('name', data.name);
    expect(result.name).toBe(data.name);
  });
});

describe('dataAccess.getOne', () => {

  const dbInstance = new dataAccess<ItestUser>(testUserModel);

  it('should get a user from the database', async () => {
    const data = {
      name: 'John Doe jr2',
      age: 5,
      email: 'jr2doe@somedomain.com'
    };
    const result = await dbInstance.getOne('676a5b4865ddbdb97d15eeaf');
    expect(result).toHaveProperty('name', data.name);
    expect(result?.email).toBe(data.email);
  });
});

describe('dataAccess.getMany', () => {

  const dbInstance = new dataAccess<ItestUser>(testUserModel);

  it('should get all users from the database', async () => {
    const result = await dbInstance.getMany();
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('dataAccess.updateOne', () => {

  const dbInstance = new dataAccess<ItestUser>(testUserModel);

  it('should update a user in the database', async () => {
    const data = {
      name: 'John Doe jr3',
      age: 18,//changed from 15 to 18
      email: 'jr3doe@somedomain.com'
    };
    const result = await dbInstance.updateOne('677760c916dc9e3d8a432c21', data);
    expect(result).toHaveProperty('age', data.age);
    expect(result?.email).toBe(data.email);
  });
});

describe('dataAccess.deleteOne', () => {

  const dbInstance = new dataAccess<ItestUser>(testUserModel);

  it('should delete a user from the database', async () => {
    const result = await dbInstance.deleteOne('6767d48178b32b5dd8f113d3');
    expect(result).toHaveProperty('name', 'SomeOne4');
    expect(result?.age).toBe(99);
  });
});