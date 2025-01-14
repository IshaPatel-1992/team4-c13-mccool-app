import { Document, Number } from 'mongoose';

export default interface IsearchScenario extends Document {
    //s_id: Number;
    search_criteria: String;
    tags: String[];
    tips: String[];
    enter_by: String;
    enter_date: Date;
    modified_by: String;
    modified_date: Date;
    isEnabled: Boolean; 
}