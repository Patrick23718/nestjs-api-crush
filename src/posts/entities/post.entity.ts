import { IsMongoId, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class Post {
  @IsString()
  @IsNotEmpty()
  Title: string;

  @IsString()
  @IsNotEmpty()
  Description: string;

  @IsString()
  @IsNotEmpty()
  Image: string;

  @IsMongoId()
  @IsNotEmpty()
  Author: string;

  @IsUUID("all")
  @IsNotEmpty()
  AuthorUid: string;

  @IsMongoId()
  @IsNotEmpty()
  Interest: string;
}
