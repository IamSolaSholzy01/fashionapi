import mongoose, { Document, Types } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    email: string;
    password: string;
    roles: string[];
    verified: boolean;
    token: string;
    active: boolean;
    review: string[];
    id: Types.ObjectId;
    name: Record<string, any>;
    fullName: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
