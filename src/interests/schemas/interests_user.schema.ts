import { Interest } from './../entities/interest.entity';
import { User } from './../../auth/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type InterestUserDocument = InterestUser & Document;

@Schema({ timestamps: true })
export class InterestUser {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name })
  User: User;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Interest.name })
  Interest: Interest;
}

export const InterestUserSchema = SchemaFactory.createForClass(InterestUser);
