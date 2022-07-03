import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  fullName: string;
}

export class CreateSellerDto extends CreateUserDto {
  constructor() {
    super();
  }

  @ApiProperty()
  roles?: string[];
}
