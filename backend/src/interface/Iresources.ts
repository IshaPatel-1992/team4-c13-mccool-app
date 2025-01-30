import { Document } from 'mongoose';

export default interface Iresources extends Document {
    title: string;
    description: string;
    category: string;
    contentType: 'article' | 'video' | 'blog' | 'podcast' | 'book' | 'other';
    content?: string; // Required only if contentType is 'article'
    contentURL?: string[]; // Required only if contentType is not 'article'
    thumbnailURL: string[];
    author: string;
    publishedDt: Date;
    tags: string[];
    enterBy: string;
    enterDt: Date;
    modifyBy: string;
    modifyDt: Date;
    isEnabled: boolean;
}
