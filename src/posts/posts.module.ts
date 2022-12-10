import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "./schemas/post.schema";
import { AuthModule } from "../auth/auth.module";
import { LikeService } from './like/like.service';
import { LikeController } from './like/like.controller';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
  controllers: [PostsController, LikeController],
  providers: [PostsService, LikeService]
})
export class PostsModule {}
