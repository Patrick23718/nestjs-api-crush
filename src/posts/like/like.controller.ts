import { Controller, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { TokenVerifyGuard } from "../../shared/token-verify/token-verify.guard";
import { LikeService } from "./like.service";
import { Request } from "express";

@Controller('post/like')
@UseGuards(TokenVerifyGuard)
export class LikeController {

  constructor(private  readonly likeService: LikeService) {
  }

  @Patch(':postId')
  like(@Req() request: Request, @Param('postId') postId: string){

  }

}
