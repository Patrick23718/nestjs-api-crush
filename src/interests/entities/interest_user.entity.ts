import { IsNotEmpty, IsMongoId } from "class-validator";

export class InterestUserDto {
  @IsMongoId()
  @IsNotEmpty()
  User: string;

  @IsMongoId()
  @IsNotEmpty()
  Interest: string;
}
