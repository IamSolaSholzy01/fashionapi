import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ReviewService } from 'src/review/review.service';
import { UsersService } from 'src/users/users.service';
import { Token } from '../auth/auth.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { ReviewProductDto, UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private reviewService: ReviewService,
    private userService: UsersService,
  ) {}

  async create(createProductDto: CreateProductDto, user: Token) {
    const seller = await this.userService.findOne(
      user.id as unknown as mongoose.Types.ObjectId,
    );
    if (createProductDto.image.length > 5)
      throw new HttpException(
        'Maximum of 5 images allowed',
        HttpStatus.FORBIDDEN,
      );
    return await this.productModel.create({
      ...createProductDto,
      seller,
    });
  }

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findByCategory(category: string) {
    return await this.productModel
      .find({
        category,
      })
      .exec();
  }

  async findOne(id: mongoose.Types.ObjectId) {
    // const rating = product.rating;
    return this.productModel.findById(id);
  }

  async findRating(id: mongoose.Types.ObjectId) {
    const reviews = await this.reviewService.findAllForProduct(id);
    console.log(id);
    let sum = 0;
    reviews.forEach(({ rating }) => (sum += rating));
    return sum / reviews.length;
  }

  async findDiscount() {
    return this.productModel.find({
      onDiscount: true,
    });
  }

  async findFeatured() {
    return this.productModel.find({
      featured: true,
    });
  }

  async update(
    id: mongoose.Types.ObjectId,
    updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productModel.findById(id);
    if (updateProductDto?.image?.length + product?.image?.length > 5)
      throw new HttpException(
        'Maximum of 5 images allowed',
        HttpStatus.FORBIDDEN,
      );
    //Todo: Restrict product update to admin or specific seller owner
    return this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  async remove(id: mongoose.Types.ObjectId) {
    //Todo: Restrict product delete to admin or specific seller owner
    // , user: Token
    return this.productModel.findByIdAndDelete(id);
  }

  async review(
    id: mongoose.Types.ObjectId,
    user: Token,
    reviewProductDto: ReviewProductDto,
  ) {
    return await this.reviewService.create(
      { ...reviewProductDto, product: id.toString() },
      user,
    );
  }
}
