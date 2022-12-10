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
  Images: string[];

  @Prop()
  Name: string;

  @Prop({ type: Date })
  Birthdate: Date;

  @Prop()
  About: string;

  @Prop()
  Email: string;

  @Prop()
  Address: string;

  @Prop()
  PhoneNumber: string;

  @Prop()
  Gender: string;

  @Prop()
  ProfileURL: string;

  @Prop({
    enum: ['AWAIT', 'PUBLISH'],
    default: 'AWAIT'
  })
  Publish: string;
}

export const UserSchema = SchemaFactory.createForClass(User);