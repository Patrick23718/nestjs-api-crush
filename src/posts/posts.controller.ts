import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common";
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from "express";
import { TokenVerifyGuard } from "../shared/token-verify/token-verify.guard";

@Controller('posts')
@UseGuards(TokenVerifyGuard)
export class PostsController {

  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() request: Request) {
    createPostDto.AuthorUid = request['userId']
    return this.postsService.create(createPostDto);
  }

  @Get(':interest')
  findAll(@Param('interest') interest: string) {
    return this.postsService.findAll(interest);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
