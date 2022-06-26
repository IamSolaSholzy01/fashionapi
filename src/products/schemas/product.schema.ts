import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as M, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: true })
  delivery: boolean;

  @Prop()
  reviews: number[];

  @Prop()
  image: string;

  id: Types.ObjectId;
  rating: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('id').get(function () {
  return this._id;
});

ProductSchema.virtual('rating').get(function () {
  let sum = 0;
  this.reviews.forEach((rev) => (sum += rev));
  return sum / this.reviews.length;
});
