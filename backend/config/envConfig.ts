import dotenv from 'dotenv';

dotenv.config();

const dbName: string = 'McCoolLeadership';
const mongodb = "mongodb://localhost:27017";//this is the local mongodb connection string for testing

export function getMongoConnectionString(): string{
    const connectionString = process.env.MONGO_CONNECTION_STRING || `${mongodb}/${dbName}`;
    if (!connectionString) {
        throw new Error('MongoDB connection string is not defined in the .env file');
    }
    return connectionString;
};