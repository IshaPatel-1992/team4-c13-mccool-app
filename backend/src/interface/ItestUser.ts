import { Document } from 'mongoose';
export default interface ItestUser extends Document {
    name: string;
    age: number;
    email: string;
}