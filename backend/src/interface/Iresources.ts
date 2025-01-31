import { Document } from 'mongoose';

export default interface Iresources extends Document {
    title: string;
  description?: string;
  category: string;
  contentType: 'article' | 'video' | 'blog' | 'podcast' | 'book' | 'other';
  content?: string;
  contentURL?: string | string[];  // Allow either a string or an array of strings.
  thumbnailURL?: string | string[];
  author?: string;
  publishedDt?: Date;
  tags?: string[];
  enterBy?: string;
  enterDt?: Date;
  modifyBy?: string;
  modifyDt?: Date;
  isEnabled?: boolean;
}
