import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [String] })
  image: string[];

  @ApiProperty()
  price: number;

  @ApiProperty()
  category: string;
}
