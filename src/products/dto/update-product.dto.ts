import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { ProductReview } from 'src/review/schemas/product-review.schema';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  constructor() {
    super();
  }
  @ApiProperty({ type: [Number] })
  reviews?: number[];
  @ApiProperty()
  onDiscount?: boolean;
  @ApiProperty()
  discount?: number;
}

export class ReviewProductDto extends OmitType(CreateReviewDto, [
  'category',
  'product',
  'seller',
]) {
  constructor() {
    super();
  }
  category: string = ProductReview.name;
}
