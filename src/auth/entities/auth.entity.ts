import { Prop } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Interest } from "../../interests/schemas/interest.schema";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength
} from "class-validator";

export class Auth {

  @IsString()
  @IsOptional()
  uid: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  Interests: Interest[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  Images: string[];

  @IsNotEmpty()
  @IsString()
  Name: string;

  @IsNotEmpty()
  // @IsDate()
  Birthdate: Date;

  @IsString()
  @IsOptional()
  About: string;

  @IsEmail()
  @IsOptional()
  Email: string;

  @IsString()
  @IsOptional()
  Address: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  PhoneNumber: string;

  @IsNotEmpty()
  @IsString()
  Gender: string;

  @IsString()
  ProfileURL: string;

  @IsString()
  @IsOptional()
  Publish: string;
}
