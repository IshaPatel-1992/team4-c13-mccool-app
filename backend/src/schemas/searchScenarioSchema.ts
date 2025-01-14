import { Schema, model } from 'mongoose';
import IsearchScenario from '../interface/IsearchScenario';
import  autoIncrement  from 'mongoose-sequence';

const searchScenarioSchema = new Schema<IsearchScenario>({
    //s_id: { type: Number, required: true, unique: true },
    search_criteria: { type: String, required: true, unique: true },
    tags: { type: [String], required: true },
    tips: { type: [String], required: true },
    enterBy: { type: String, required: true },
    enterDt: { type: Date, required: true },
    modifyBy: { type: String, required: true },
    modifyDt: { type: Date, required: true },
    isEnabled: { type: Boolean, required: true, default: true }
});



// Use the auto-increment plugin
//searchScenarioSchema.plugin(autoIncrement, { inc_field: 's_id' });
//const SearchScenario = model('SearchScenario', searchScenarioSchema);
//export default SearchScenario;
export default searchScenarioSchema;