import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Condition } from 'mongoose';
import { Token } from 'src/auth/auth.interface';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/schemas/product.schema';
import { UsersService } from 'src/users/users.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ProductReview } from './schemas/product-review.schema';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(ProductReview.name)
    private productReviewModel: Model<ProductReview>,
    private usersService: UsersService,
  ) {}

  async create(createReviewDto: CreateReviewDto, user: Token): Promise<Review> {
    const author = await this.usersService.findOne(
      user.id as unknown as mongoose.Types.ObjectId,
    );
    const { product, seller, ...reviewObj } = createReviewDto;
    const review = await this.reviewModel.create({
      ...reviewObj,
      product,
      seller,
      author,
    });
    await this.usersService.addReview(author.id, review.id);
    console.log(review.product);
    return review;
  }

  async findAll() {
    return await this.reviewModel.find().exec();
  }

  async findAllForProduct(product: mongoose.Types.ObjectId) {
    return await this.productReviewModel
      .find({
        product: new mongoose.Types.ObjectId(product),
      })
      .exec();
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
