import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { User } from "../../auth/schemas/user.schema";

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

  @IsOptional()
  @IsMongoId()
  Author: string;

  @IsOptional()
  @IsUUID()
  AuthorUid: string;

  @IsMongoId()
  @IsNotEmpty()
  Interest: string;

  @IsArray()
  @IsOptional()
  @IsMongoId()
  Likes: User[]
}
