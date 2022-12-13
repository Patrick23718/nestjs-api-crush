import { InterestsUserService } from './intersest_user.service';
import { InterestUserDto } from './entities/interest_user.entity';
import { Controller, Get, Post, Body , Req} from "@nestjs/common";
import { Request } from 'express';


@Controller('interests_user')
export class InterestsUserController {
  constructor(private readonly interestsUserService: InterestsUserService) {}

  @Post()
  create(@Body() dto : InterestUserDto) {
    return this.interestsUserService.create(dto);
  }

  @Get()
  getAll() {
    return this.interestsUserService.getAll();
  }

  @Get('match')
  getMatches(@Body() dto : {uid: string}){
    return this.interestsUserService.getMatches(dto.uid);
  }
}
