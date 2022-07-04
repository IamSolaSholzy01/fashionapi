import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { User } from 'src/users/schemas/user.schema';

@Schema()
export class SellerReview {
  category: string;
  author: User;
  rating: number;
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  @Type(() => User)
  seller: User;
}

export const SellerReviewSchema = SchemaFactory.createForClass(SellerReview);
