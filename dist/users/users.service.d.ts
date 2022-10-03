import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    createSeller(createSellerDto: CreateUserDto): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: mongoose.Types.ObjectId): Promise<User>;
    findByEmail(email: string): Promise<User>;
    getPassword(id: mongoose.Types.ObjectId): Promise<User>;
    update(id: mongoose.Types.ObjectId, updateUserDto: UpdateUserDto): Promise<User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    addReview(id: mongoose.Types.ObjectId, review: mongoose.Types.ObjectId): Promise<User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    countAdmins(): Promise<number>;
    promoteToAdmin(id: mongoose.Types.ObjectId): Promise<User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    countSellers(): Promise<number>;
    remove(id: mongoose.Types.ObjectId): Promise<User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
}
