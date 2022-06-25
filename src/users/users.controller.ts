import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid Object Id', HttpStatus.FORBIDDEN);
    const user = await this.usersService.findOne(
      id as unknown as mongoose.Types.ObjectId,
    );
    if (!user)
      throw new HttpException('User with ID not found', HttpStatus.NOT_FOUND);
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid Object Id', HttpStatus.FORBIDDEN);
    return this.usersService.update(
      id as unknown as mongoose.Types.ObjectId,
      updateUserDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid Object Id', HttpStatus.FORBIDDEN);
    return this.usersService.remove(id as unknown as mongoose.Types.ObjectId);
  }
}
