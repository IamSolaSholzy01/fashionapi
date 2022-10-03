import mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
export declare class SellerReview {
    category: string;
    author: User;
    rating: number;
    description: string;
    seller: User;
}
export declare const SellerReviewSchema: mongoose.Schema<SellerReview, mongoose.Model<SellerReview, any, any, any, any>, {}, {}, {}, {}, "type", SellerReview>;
