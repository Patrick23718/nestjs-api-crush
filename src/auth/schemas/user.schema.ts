import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';
import {
  Document
} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({unique: true})
  uid: string;

  //@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
  //owner: Owner[];

  @Prop()
  FirstName: string;

  @Prop()
  SurName: string;

  @Prop()
  Designation: string;

  @Prop()
  Email: string;

  @Prop()
  Address: string;

  @Prop()
  Salary: string;

  @Prop()
  Gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);