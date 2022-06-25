import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;
}

export class ResendDto {
  @ApiProperty()
  old_email: string;

  @ApiProperty()
  new_email: string;
}
