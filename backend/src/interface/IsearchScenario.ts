import { Document } from 'mongoose';

export default interface IsearchScenario extends Document {
    critera: string;
    tags: string[];
    tips: string[];
    enter_by: string;
    enter_date: Date;
    modified_by: string;
    modified_date: Date;
}