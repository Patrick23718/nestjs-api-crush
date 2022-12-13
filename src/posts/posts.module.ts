import { Comment, CommentSchema } from './comment/schema/comment.schema';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "./schemas/post.schema";
import { AuthModule } from "../auth/auth.module";
import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([
    { name: Post.name, schema: PostSchema },
    {name: Comment.name, schema: CommentSchema}
  ])],
  controllers: [PostsController, CommentController],
  providers: [PostsService, CommentService]
})
export class PostsModule {}
