import { Document, Number } from 'mongoose';

export default interface IsearchScenario extends Document {
    //s_id: number;
    search_criteria: string;
    tags: string[];
    tips: string[];
    enterBy: string;
    enterDt: Date;
    modifyBy: String;
    modifyDt: Date;
    isEnabled: Boolean; 
}