import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    description: 'Contact nickname',
    type: String,
    default: 'Ray',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Contact e-mail',
    type: String,
    default: 'ray@mail.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Contact phone number',
    type: String,
    default: 'teste@mail.com',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(8)
  phone: string;
}
