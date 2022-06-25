import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  constructor() {
    super();
  }
  @ApiProperty({ required: false })
  token?: string;

  @ApiProperty({ required: false })
  verified?: boolean;
}
