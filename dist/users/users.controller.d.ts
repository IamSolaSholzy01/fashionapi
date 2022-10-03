import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose from 'mongoose';
import { User } from './schemas/user.schema';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    countAdmins(): Promise<number>;
    countSellers(): Promise<number>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    promoteAdmin(id: string): Promise<User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(id: string): Promise<User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
}
