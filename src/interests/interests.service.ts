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
    const employee = new this.interestModel(createInterestDto);
    return employee.save();
  }

}
