import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findSelf(@Request() req) {
    return this.usersService.findSelf(req.user.id);
  }

  @Patch('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Delete('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Request() req) {
    return this.usersService.remove(req.user.id);
  }
}
