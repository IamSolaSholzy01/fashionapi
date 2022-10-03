import { ProductsService } from './products.service';
import { CreateProductDto, MultipleCreateProductDto } from './dto/create-product.dto';
import { ReviewProductDto, UpdateProductDto } from './dto/update-product.dto';
import mongoose from 'mongoose';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(req: any, createProductDto: CreateProductDto): Promise<Omit<mongoose.MergeType<import("./schemas/product.schema").ProductDocument, {
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
    createBulk(req: any, createBulkProductDto: MultipleCreateProductDto): Promise<any[]>;
    findAll(): Promise<(import("./schemas/product.schema").Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    findAllCategories(): Promise<string[]>;
    findByCategory(category: string): Promise<(import("./schemas/product.schema").Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    findRating(id: string): Promise<number>;
    findDiscount(): Promise<(import("./schemas/product.schema").Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    findFeatured(): Promise<(import("./schemas/product.schema").Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("./schemas/product.schema").Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./schemas/product.schema").Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(req: any, id: string): Promise<import("./schemas/product.schema").Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    review(req: any, id: string, reviewProductDto: ReviewProductDto): Promise<import("../review/schemas/review.schema").Review>;
}
