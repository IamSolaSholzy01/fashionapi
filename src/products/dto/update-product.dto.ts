import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  constructor() {
    super();
  }
  @ApiProperty({ type: [Number] })
  reviews?: number[];
}
