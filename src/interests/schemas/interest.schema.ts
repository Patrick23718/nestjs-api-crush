import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';
import {
  Document
} from 'mongoose';

export type InterestDocument = Interest & Document;

@Schema({ timestamps: true })
export class Interest {
  @Prop()
  NameFr: string;

  @Prop()
  NameEn: string;

}

export const InterestSchema = SchemaFactory.createForClass(Interest);