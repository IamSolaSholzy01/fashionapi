import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ReviewProductDto, UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/roles.decorator';
import mongoose from 'mongoose';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @Roles(Role.Seller, Role.Admin)
  @Post()
  async create(@Request() req, @Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto, req.user);
  }

  @Public()
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Public()
  @Get(':category')
  findByCategory(@Param('category') category: string) {
    return this.productsService.findByCategory(category);
  }

  @Public()
  @Get('rating/:id')
  findRating(@Param('id') id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid Object Id', HttpStatus.FORBIDDEN);
    return this.productsService.findRating(
      id as unknown as mongoose.Types.ObjectId,
    );
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid Object Id', HttpStatus.FORBIDDEN);
    return this.productsService.findOne(
      id as unknown as mongoose.Types.ObjectId,
    );
  }

  @ApiBearerAuth()
  @Roles(Role.Seller)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid Object Id', HttpStatus.FORBIDDEN);
    return this.productsService.update(
      id as unknown as mongoose.Types.ObjectId,
      updateProductDto,
    );
  }

  // @Roles(Role.Seller)
  @ApiBearerAuth()
  @Roles(Role.Seller, Role.Admin)
  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid Object Id', HttpStatus.FORBIDDEN);
    return this.productsService.remove(
      id as unknown as mongoose.Types.ObjectId,
      // req.user,
    );
  }

  @ApiBearerAuth()
  @Roles(Role.Seller, Role.Admin)
  @Post('/review/:id')
  review(
    @Request() req: any,
    @Param('id') id: string,
    @Body() reviewProductDto: ReviewProductDto,
  ) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid Object Id', HttpStatus.FORBIDDEN);
    return this.productsService.review(
      id as unknown as mongoose.Types.ObjectId,
      req.user,
      reviewProductDto,
    );
  }
}
