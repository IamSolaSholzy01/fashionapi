import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document, Schema as M, Types } from 'mongoose';
import { Category } from 'src/enums/review.enum';
import { User } from 'src/users/schemas/user.schema';
import { ProductReview } from './product-review.schema';
import { SellerReview } from './seller-review.schema';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true, discriminatorKey: 'category' })
export class Review {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  @Type(() => User)
  author: User;

  @Prop({ required: true, max: 10, min: 0 })
  rating: number;

  @Prop({ required: false })
  description?: string;

  @Prop({
    enum: [ProductReview.name, SellerReview.name],
    required: true,
    default: ProductReview.name,
  })
  category?: string;

  id: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.virtual('id').get(function () {
  return this._id;
});
