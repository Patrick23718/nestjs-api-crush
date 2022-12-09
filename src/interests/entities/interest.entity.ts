import { IsNotEmpty, IsString } from "class-validator";

export class Interest {
  @IsString()
  @IsNotEmpty()
  NameFr: string;

  @IsString()
  @IsNotEmpty()
  NameEn: string;
}
