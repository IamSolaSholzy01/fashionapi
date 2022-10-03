import mongoose, { Model } from 'mongoose';
import { Token } from 'src/auth/auth.interface';
import { UsersService } from 'src/users/users.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review, ReviewDocument } from './schemas/review.schema';
export declare class ReviewService {
    private reviewModel;
    private usersService;
    constructor(reviewModel: Model<ReviewDocument>, usersService: UsersService);
    create(createReviewDto: CreateReviewDto, user: Token): Promise<Review>;
    findAll(): Promise<Omit<Review & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }, never>[]>;
    findAllForProduct(product: mongoose.Types.ObjectId): Promise<(Review & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    findOne(id: mongoose.Types.ObjectId): Promise<Review & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    update(id: mongoose.Types.ObjectId, updateReviewDto: UpdateReviewDto): Promise<Review & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(id: mongoose.Types.ObjectId): Promise<Review & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
}
