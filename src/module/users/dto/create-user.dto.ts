import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name',
    type: String,
    default: 'Rafael Carvalho',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'E-mail',
    type: String,
    default: 'rafael@mail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Phone number',
    type: String,
    default: '(11) 91234-5678',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  phone: string;

  @ApiProperty({
    description: 'Password',
    type: String,
    default: 'Teste1234',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;
}
