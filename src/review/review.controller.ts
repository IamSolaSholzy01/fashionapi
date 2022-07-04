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
  Request,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import mongoose from 'mongoose';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiBearerAuth()
  @Post()
  create(@Request() req, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto, req.user);
  }

  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid Object Id', HttpStatus.FORBIDDEN);
    return this.reviewService.findOne(id as unknown as mongoose.Types.ObjectId);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid Object Id', HttpStatus.FORBIDDEN);
    return this.reviewService.update(
      id as unknown as mongoose.Types.ObjectId,
      updateReviewDto,
    );
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid Object Id', HttpStatus.FORBIDDEN);
    return this.reviewService.remove(id as unknown as mongoose.Types.ObjectId);
  }
}
