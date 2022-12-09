import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { InterestsService } from './interests.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { TokenVerifyGuard } from "../shared/token-verify/token-verify.guard";

@Controller('interests')
@UseGuards(TokenVerifyGuard)
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Post()
  create(@Body() createInterestDto: CreateInterestDto) {
    return this.interestsService.create(createInterestDto);
  }
}
