import { PostsService } from './../posts.service';
import { CommentDto } from './dto/comment.dto';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class CommentService {

    constructor(
        @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,
        private readonly postService: PostsService
    ){}

    async create(dto : CommentDto): Promise<Comment>{
        const Comment = new this.CommentModel(dto);
        const res = Comment.save();
            res.then((val)=>{
                if(val.parent){
                    this.updateComments(val.parent, val._id);
                }else{
                    this.postService.updateComments(val.Post, val._id);
                }
            })
        
        return res
    }

    
  async getAll(id: string):Promise<Comment[]>{
    return this.CommentModel.find({Post: id, parent: null}).populate({
        path: 'User',
        select: ["_id", "uid", "Name"],
    }).populate({
        path: 'Post',
        select: ["_id", "Title", "Description", "Interest", "Likes"],
        populate: {
            path: "Interest",
            select: ["NameFr", "NameEn"]
        }
    }).populate({
        path: 'Comments',
        select: ['User', 'publishAt', 'content', '_id', 'Comments'],
        populate: {
            path: "User",
            select: ["_id", "uid", "Name", "Gender"],
        }
    })
  }

    

    async removeOne(id: string){
        const comment = await this.CommentModel.findById(id);
                if(comment.parent){
                    this.updateComments(comment.parent, id);
                }else{
                    this.postService.updateComments(comment.Post, id);
                }
         
        await this.CommentModel.deleteMany({parent: id});
        return this.CommentModel.deleteOne({_id: id});
    }

    async updateComments(id: string | any, _idSubComment: string) {
        const comment = await this.CommentModel.findById(id);
        if(!comment) return new  ForbiddenException('comment have been delete');
        const actualComments = comment.Comments;
        const idSub = new mongoose.Types.ObjectId(_idSubComment)
        this.toggle(actualComments, idSub)
        return this.CommentModel.findOneAndUpdate({ _id: id }, { $set: { Comments: [...actualComments] } }, { new: true })
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
