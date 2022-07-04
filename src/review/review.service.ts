import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Token } from 'src/auth/auth.interface';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    private usersService: UsersService,
    private productService: ProductsService,
  ) {}

  async create(createReviewDto: CreateReviewDto, user: Token): Promise<Review> {
    const author = await this.usersService.findOne(
      user.id as unknown as mongoose.Types.ObjectId,
    );
    const { product, seller, ...reviewObj } = createReviewDto;
    const productObj = await this.productService.findOne(
      product as unknown as mongoose.Types.ObjectId,
    );
    const sellerObj = await this.usersService.findOne(
      seller as unknown as mongoose.Types.ObjectId,
    );
    const review = await this.reviewModel.create({
      ...reviewObj,
      product,
      seller,
      author,
    });
    await this.usersService.addReview(author.id, review.id);
    return review;
  }

  async findAll() {
    return await this.reviewModel.find().exec();
  }

  async findOne(id: mongoose.Types.ObjectId) {
    return await this.reviewModel.findById(id).exec();
  }

  async update(id: mongoose.Types.ObjectId, updateReviewDto: UpdateReviewDto) {
    return await this.reviewModel.findByIdAndUpdate(id, updateReviewDto);
  }

  async remove(id: mongoose.Types.ObjectId) {
    return await this.reviewModel.findByIdAndDelete(id);
  }
}
