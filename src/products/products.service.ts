import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Token } from '../auth/auth.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    //Todo: Add user id as seller on model
    return await this.productModel.create(createProductDto);
  }

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findOne(id: mongoose.Types.ObjectId) {
    const product = await this.productModel.findById(id);
    const rating = product.rating;
    return { ...product.toObject(), rating };
  }

  async findRating(id: mongoose.Types.ObjectId) {
    return (await this.productModel.findById(id)).rating;
  }

  async update(
    id: mongoose.Types.ObjectId,
    updateProductDto: UpdateProductDto,
  ) {
    //Todo: Restrict product update to admin or spectific seller owner
    return await this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  async remove(id: mongoose.Types.ObjectId, user: Token) {
    //Todo: Restrict product delete to admin or specific seller owner
    return await this.productModel.findByIdAndDelete(id);
  }
}
