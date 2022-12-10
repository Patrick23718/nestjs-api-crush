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

  /**
   *
   * @param createPostDto
   */
  async create(createPostDto: CreatePostDto): Promise<PostDocument>{
    const user = await this.authService.findOne(createPostDto.AuthorUid)
    createPostDto.Author = user._id;
    const post = new this.postModel(createPostDto);
    return post.save();
  }

  async findAll(interest: string): Promise<PostDocument[]> {
    return this.postModel.find({Interest: interest}).populate({
        path: "Author",
        select: ["_id", "uid", "Name", "Interests", "Birthdate", "Gender"],
        populate: {
          path: "Interests",
          select: ["NameFr", "NameEn"]
        }
      }).populate({
        path: "Interest",
        select: ["NameFr", "NameEn"]
      });
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
