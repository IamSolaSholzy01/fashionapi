import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as M, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  age: number;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ enum: ['Admin', 'Basic', 'Seller'], default: 'Basic' })
  role: string;

  @Prop({ default: false })
  verified: boolean;

  @Prop()
  token: string;

  id: Types.ObjectId;
  @Prop(
    raw({
      first: { type: String },
      last: { type: String },
    }),
  )
  name: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('fullName')
  .get(function () {
    return this.name.first + ' ' + this.name.last;
  })
  .set(function (v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
  });

UserSchema.virtual('id').get(function () {
  return this._id;
});
