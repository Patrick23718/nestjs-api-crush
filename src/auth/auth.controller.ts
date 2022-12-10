import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { TokenVerifyGuard } from "../shared/token-verify/token-verify.guard";
import { Request } from "express";

@Controller('auth')
@UseGuards(TokenVerifyGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createAuthDto: CreateAuthDto, @Req() request: Request) {
    createAuthDto.uid = request['userId'];
    createAuthDto.PhoneNumber = request['userPhoneNumber'] || createAuthDto.PhoneNumber;
    return await this.authService.create(createAuthDto);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  @Get()
  async findOne(@Req() request: Request) {
    return this.authService.findOne(request['userId']);
  }

  @Patch()
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto, @Req() request: Request) {
    return this.authService.update(request['userId'], updateAuthDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
