import mongoose from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { User } from 'src/users/schemas/user.schema';
export declare class ProductReview {
    category: string;
    author: User;
    rating: number;
    description: string;
    product: Product;
}
export declare const ProductReviewSchema: mongoose.Schema<ProductReview, mongoose.Model<ProductReview, any, any, any, any>, {}, {}, any, {}, "type", ProductReview>;
