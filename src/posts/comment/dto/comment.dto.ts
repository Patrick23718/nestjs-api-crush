import { IsMongoId, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CommentDto {
    @IsNotEmpty()
    @IsMongoId()
    User: string;
    @IsNotEmpty()
    @IsMongoId()
    Post: string;
    @IsNotEmpty()
    @IsString()
    content: string;
    @IsOptional()
    @IsMongoId()
    parent?: string;
}