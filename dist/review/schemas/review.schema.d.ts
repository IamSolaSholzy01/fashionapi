import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
export declare type ReviewDocument = Review & Document;
export declare class Review {
    author: User;
    rating: number;
    comments?: string;
    category?: string;
    id: Types.ObjectId;
}
export declare const ReviewSchema: mongoose.Schema<Review, mongoose.Model<Review, any, any, any, any>, {}, {}, {}, {}, "type", Review>;
