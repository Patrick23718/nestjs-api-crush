import { Post } from '../../schemas/post.schema';
import { User } from '../../../auth/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
   
 @Prop()
 content: string;

 @Prop({ default: new Date().toLocaleDateString()})
 publishAt: string;
 
 @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
 User: User;

 @Prop({type: mongoose.Schema.Types.ObjectId, ref: Post.name})
 Post: Post;

 @Prop({type: [{type:mongoose.Schema.Types.ObjectId, ref: Comment.name}]})
 Comments: Comment[];

 @Prop({type: mongoose.Schema.Types.ObjectId, ref: Comment.name, default: null})
 parent: Comment;
    

}

export const CommentSchema = SchemaFactory.createForClass(Comment)