import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';
import mongoose, {
  Document
} from "mongoose";
import { Interest } from "../../interests/schemas/interest.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({unique: true})
  uid: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Interest.name }] })
  Interests: Interest[];

  @Prop()
  Name: string;

}

export const UserSchema = SchemaFactory.createForClass(User);