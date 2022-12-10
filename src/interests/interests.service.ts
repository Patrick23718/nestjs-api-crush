import { Injectable } from '@nestjs/common';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { Interest, InterestDocument } from "./schemas/interest.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class InterestsService {

  constructor(@InjectModel(Interest.name) private interestModel: Model<InterestDocument>) {
  }

  async create(createInterestDto: CreateInterestDto): Promise<InterestDocument> {
    const interest = new this.interestModel(createInterestDto);
    return interest.save();
  }

  async getAll(): Promise<InterestDocument[]>{
    return this.interestModel.find();
  }

}
