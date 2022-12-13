import { Comment } from './../comment/schema/comment.schema';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Interest } from "../../interests/schemas/interest.schema";
import { User } from "../../auth/schemas/user.schema";


export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {

 @Prop()
  Title: string;

 @Prop()
  Description: string;

 @Prop()
  Image: string;

 @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
  Author: User;

 @Prop()
 AuthorUid: string;

 @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Interest.name })
  Interest: Interest;

 @Prop({type: [{type:mongoose.Schema.Types.ObjectId, ref: User.name}]})
 Likes: User[];

 @Prop({type: [{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}]})
 Comments: Comment[];

}

export const PostSchema = SchemaFactory.createForClass(Post)