import { InterestUserDto } from './entities/interest_user.entity';
import { InterestUser, InterestUserDocument } from './schemas/interests_user.schema';
import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class InterestsUserService {

  constructor(@InjectModel(InterestUser.name) private interestModel: Model<InterestUserDocument>) {
  }

  async create(dto: InterestUserDto): Promise<InterestUserDocument> {
    const interest = new this.interestModel(dto);
    return interest.save();
  }

  async getAll(): Promise<InterestUserDocument[]>{
    return this.interestModel.find();
  }

}
