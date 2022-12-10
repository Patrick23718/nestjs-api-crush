import { Injectable } from "@nestjs/common";
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Post, PostDocument } from "./schemas/post.schema";
import { Model } from "mongoose";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>, private readonly  authService: AuthService) {
  }
  async create(createPostDto: CreatePostDto){
    const user = await this.authService.findOne(createPostDto.AuthorUid)
    console.log(user)
    // const post = new this.postModel(createPostDto);
    // return post.save();
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
