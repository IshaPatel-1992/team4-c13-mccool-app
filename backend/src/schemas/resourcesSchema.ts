import { Schema, model } from 'mongoose';
import Iresources from '../interface/Iresources';

const resourcesSchema = new Schema<Iresources>({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true},
    category: { type: String, required: true},
    contentType: { type: String, required: true},
    contentURL: { type: [String], required: true},
    thumbnailURL: { type: [String], required: true },
    author: { type: String, required: true},
    publishedDt: { type: Date, required: true},
    tags: { type: [String], required: true },
    enterBy: { type: String, required: true },
    enterDt: { type: Date, required: true },
    modifyBy: { type: String, required: true },
    modifyDt: { type: Date, required: true },
    isEnabled: { type: Boolean, required: true, default: true }
});


export default resourcesSchema;
//export default model<Iresources>('resources', resourcesSchema);