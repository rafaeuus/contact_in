import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User e-mail',
    type: String,
    default: 'rafael@mail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    type: String,
    default: 'Teste1234',
  })
  @IsString()
  password: string;
}
