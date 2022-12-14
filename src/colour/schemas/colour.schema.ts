import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ColourDocument = Colour & Document;

@Schema({ timestamps: true })
export class Colour {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  hex: string;

  id: Types.ObjectId;
}

export const ColourSchema = SchemaFactory.createForClass(Colour);

ColourSchema.virtual('id').get(function () {
  return this._id;
});
