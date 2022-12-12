import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "./schemas/post.schema";

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
