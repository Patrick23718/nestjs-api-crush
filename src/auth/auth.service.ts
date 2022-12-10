import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Interest } from "../interests/schemas/interest.schema";

@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private authModel: Model<UserDocument>) {
  }
  async create(createAuthDto: CreateAuthDto) {
    const user = await new this.authModel(createAuthDto);
    return user.save();
  }

  async findOne(id: string): Promise<UserDocument[]> {
    return this.authModel.findOne({uid: id}).populate('Interests')
  }

  async update(id: string, updateAuthDto: UpdateAuthDto): Promise<UserDocument> {
    return this.authModel.findOneAndUpdate( {uid: id}, updateAuthDto, {new: true}).populate('Interests');
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
