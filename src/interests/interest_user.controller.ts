import { InterestsUserService } from './intersest_user.service';
import { InterestUserDto } from './entities/interest_user.entity';
import { Controller, Get, Post, Body } from "@nestjs/common";


@Controller('interests_user')
export class InterestsUserController {
  constructor(private readonly interestsUserService: InterestsUserService) {}

  @Post()
  create(@Body() dto : InterestUserDto) {
    return dto;
  }

  @Get()
  getAll() {
    return "get all"
  }
}
