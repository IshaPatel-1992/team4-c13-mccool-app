import mongoose, { Document, Model } from 'mongoose';
import { connectToDatabase } from './database';
import isEmptyObject from '../utils/isEmptyObject';

class DataAccess<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
        if (mongoose.connection.readyState === 0)
            connectToDatabase()
                .then(() => this.model.db = mongoose.connection);//link the model to the database
    }

    async getOne(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async getMany(filter: object = {}): Promise<T[]> {
        if (isEmptyObject(filter))
            return this.model.find().exec();

        return this.model.find(filter).exec();
    }

    async insertOne(data: Partial<T>): Promise<T> {
        const document = new this.model(data);
        return document.save();
    }

    async insertMany(data: Partial<T>[]): Promise<T[]> {
        return this.model.insertMany(data) as unknown as T[];
    }

    async updateOne(id: string, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async deleteOne(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }
}

export default DataAccess;