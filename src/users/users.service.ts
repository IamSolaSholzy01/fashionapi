import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'argon2';
import mongoose, { Model } from 'mongoose';
import { Role } from 'src/enums/role.enum';
import { CreateSellerDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createSeller(createSellerDto: CreateUserDto): Promise<User> {
    const { email, password, fullName } = createSellerDto;
    const roles = [Role.Seller];
    try {
      const hashed = await hash(password);
      return await this.userModel.create({
        email,
        password: hashed,
        fullName,
        roles,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, fullName } = createUserDto;
    try {
      const hashed = await hash(password);
      return await this.userModel.create({
        email,
        password: hashed,
        fullName,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findOne(id: mongoose.Types.ObjectId): Promise<User> {
    return await this.userModel.findById(id).select('-password').exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).select('-password').exec();
  }

  async getPassword(id: mongoose.Types.ObjectId): Promise<User> {
    return await this.userModel.findById(id).select('password').exec();
  }

  async update(id: mongoose.Types.ObjectId, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async countAdmins(): Promise<number> {
    return await this.userModel.countDocuments({
      roles: Role.Admin,
    });
  }

  async promoteToAdmin(id: mongoose.Types.ObjectId) {
    return await this.userModel.findByIdAndUpdate(id, {
      $push: { roles: Role.Admin },
    });
  }

  async countSellers(): Promise<number> {
    return await this.userModel.countDocuments({
      roles: Role.Seller,
    });
  }

  async remove(id: mongoose.Types.ObjectId) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
