import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import mongoose from 'mongoose';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(req: any, createReviewDto: CreateReviewDto): Promise<import("./schemas/review.schema").Review>;
    findAll(): Promise<Omit<import("./schemas/review.schema").Review & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }, never>[]>;
    findOne(id: string): Promise<import("./schemas/review.schema").Review & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    update(id: string, updateReviewDto: UpdateReviewDto): Promise<import("./schemas/review.schema").Review & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(id: string): Promise<import("./schemas/review.schema").Review & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
}
