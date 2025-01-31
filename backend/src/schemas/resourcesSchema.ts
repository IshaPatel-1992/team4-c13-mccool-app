import { Schema, model } from 'mongoose';
import Iresources from '../interface/Iresources';

    const resourcesSchema = new Schema<Iresources>({
        title: { type: String, required: true, unique: true },
        description: { type: String },
        category: { type: String, required: true },
        contentType: { 
            type: String, 
            required: true, 
            enum: ['article', 'video', 'blog', 'podcast', 'book', 'other'] 
        },
        content: { type: String },
        contentURL: { 
            type: Schema.Types.Mixed, 
            validate: {
                validator: (v: string | string[]) => {
                    return typeof v === 'string' || Array.isArray(v);
                },
                message: 'contentURL must be a string or an array of strings.'
            }
        },
        thumbnailURL: { 
            type: Schema.Types.Mixed, 
            validate: {
                validator: (v: string | string[]) => {
                    return typeof v === 'string' || Array.isArray(v);
                },
                message: 'thumbnailURL must be a string or an array of strings.'
            }
        },
        author: { type: String },
        publishedDt: { type: Date },
        tags: { type: [String] },
        enterBy: { type: String },
        enterDt: { type: Date },
        modifyBy: { type: String },
        modifyDt: { type: Date },
        isEnabled: { type: Boolean, default: true }
});

export default resourcesSchema;
// export default model<Iresources>('resources', resourcesSchema);
