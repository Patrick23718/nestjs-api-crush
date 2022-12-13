import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common";
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { TokenVerifyGuard } from "../shared/token-verify/token-verify.guard";
import { Request } from "express";
@Controller('posts')
// @UseGuards(TokenVerifyGuard)
export class PostsController {

  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() request: Request) {
    createPostDto.AuthorUid = request['userId']
    return this.postsService.create(createPostDto);
  }

  @Get(':interest')
  async findAll(@Param('interest') interest: string) {
    return await this.postsService.findAll(interest);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: { _id: string}) {
    return this.postsService.updateLikes(id, dto._id);
  }

  @Delete()
  delete( @Body() dto: { _id: string}){
    return this.postsService.remove(dto._id);
  }


}
