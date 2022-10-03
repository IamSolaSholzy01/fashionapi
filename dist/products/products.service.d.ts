import mongoose, { Model } from 'mongoose';
import { ReviewService } from 'src/review/review.service';
import { UsersService } from 'src/users/users.service';
import { Token } from '../auth/auth.interface';
import { CreateProductDto, MultipleCreateProductDto } from './dto/create-product.dto';
import { ReviewProductDto, UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
export declare class ProductsService {
    private productModel;
    private reviewService;
    private userService;
    constructor(productModel: Model<ProductDocument>, reviewService: ReviewService, userService: UsersService);
    create(createProductDto: CreateProductDto, user: Token): Promise<Omit<mongoose.MergeType<ProductDocument, {
        seller: import("../users/schemas/user.schema").User;
        name: string;
        description: string;
        image: string[];
        price: number;
        category: string;
    }>, "_id"> & Required<{
        _id: any;
    }> & {
        _id: mongoose.Types.ObjectId;
    }>;
    createMultiple(createBulkProductDto: MultipleCreateProductDto, user: Token): Promise<any[]>;
    findAll(): Promise<(Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    findCategories(): Promise<string[]>;
    findByCategory(category: string): Promise<(Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    findOne(id: mongoose.Types.ObjectId): Promise<Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    findRating(id: mongoose.Types.ObjectId): Promise<number>;
    findDiscount(): Promise<(Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    findFeatured(): Promise<(Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    update(id: mongoose.Types.ObjectId, updateProductDto: UpdateProductDto): Promise<Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(id: mongoose.Types.ObjectId): Promise<Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    review(id: mongoose.Types.ObjectId, user: Token, reviewProductDto: ReviewProductDto): Promise<import("../review/schemas/review.schema").Review>;
}
