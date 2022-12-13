import { CommentDto } from './dto/comment.dto';
import { Controller, Delete, Body, Post, Get,Param, UseGuards } from "@nestjs/common";
import { TokenVerifyGuard } from "../../shared/token-verify/token-verify.guard";
import { CommentService } from "./comment.service";
import { Request } from "express";

@Controller('post/Comment')
// @UseGuards(TokenVerifyGuard)
export class CommentController {

  constructor(private  readonly commentService: CommentService) {
  }

  @Post('')
  create(@Body() dto: CommentDto){
    return this.commentService.create(dto)
  }

  @Delete()
  delete(@Body() dto: {id: string}){
    return this.commentService.removeOne(dto.id);
  }

  @Get(':postID')
  getAll(@Param('postID') postID :string){
    return this.commentService.getAll(postID);
  }




}
