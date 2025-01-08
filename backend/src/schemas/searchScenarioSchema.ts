import { Schema } from 'mongoose';
import IsearchScenario from '../interface/IsearchScenario';

const searchScenarioSchema = new Schema<IsearchScenario>({
    critera: { type: String, required: true, unique: true },
    tags: { type: [String], required: true },
    tips: { type: [String], required: true },
    enter_by: { type: String, required: true },
    enter_date: { type: Date, required: true },
    modified_by: { type: String, required: true },
    modified_date: { type: Date, required: true }
});

export default searchScenarioSchema;