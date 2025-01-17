import { Document, Number } from 'mongoose';

export default interface Iresources extends Document {
    title: String,
    description: String,
    category: String,
    contentType: String,
    contentURL: String[],
    thumbnailURL: String[],
    author: String,
    publishedDt: String,
    tags: String[],
    enterBy: String,
    enterDt: Date,
    modifyBy: String,
    modifyDt: Date,
    isEnabled: Boolean 
}