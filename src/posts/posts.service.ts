import { Comment, CommentDocument } from './comment/schema/comment.schema';
import { Injectable } from "@nestjs/common";
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Post, PostDocument } from "./schemas/post.schema";
import { Model } from "mongoose";
import { AuthService } from "../auth/auth.service";
import mongoose from 'mongoose';

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>,
   private readonly authService: AuthService,
   @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
   ) {
  }

  /**
   *
   * @param createPostDto
   */
  async create(createPostDto: CreatePostDto): Promise<PostDocument> {
    const user = await this.authService.findOne(createPostDto.AuthorUid)
    createPostDto.Author = user._id;
    const post = new this.postModel(createPostDto);
    return post.save();
  }

  async findAll(interest: string): Promise<PostDocument[]> {
    console.log(interest);

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

  async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id);
  }

  async updateLikes(id: string, _idUser: string) {
    const post = await this.postModel.findById(id);
    const actualLikes = post.Likes;
    const idUser = new mongoose.Types.ObjectId(_idUser)
    this.toggle(actualLikes, idUser)
    return this.postModel.findOneAndUpdate({ _id: id }, { $set: { Likes: [...actualLikes] } }, { new: true })
  }

  async remove(id: string) {
    await this.commentModel.deleteMany({Post: id});
    return this.postModel.findByIdAndRemove(id);
  }



  async updateComments(id: string | any, _idComment: string) {
    const post = await this.postModel.findById(id);
    const actualComments = post.Comments;
    const idUser = new mongoose.Types.ObjectId(_idComment)
    this.toggle(actualComments, idUser)
    return this.postModel.findOneAndUpdate({ _id: id }, { $set: { Comments: [...actualComments] } }, { new: true })
  }

  toggle(collection: any[], item: any) {

    const idx = collection.indexOf(item);
    if (idx == -1) {
      collection.push(item);
    } else {
      collection.splice(idx, 1);
    }

  }
}
