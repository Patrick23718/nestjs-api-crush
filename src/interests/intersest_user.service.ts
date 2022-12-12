import { User } from './../auth/schemas/user.schema';
import { AuthService } from './../auth/auth.service';
import { InterestUserDto } from './entities/interest_user.entity';
import { InterestUser, InterestUserDocument } from './schemas/interests_user.schema';
import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class InterestsUserService {

  constructor(
    private auth: AuthService,
    @InjectModel(InterestUser.name) private interestUserModel: Model<InterestUserDocument>) {
  }

  async create(dto: InterestUserDto): Promise<InterestUserDocument> {
    const interest = new this.interestUserModel(dto);
    return interest.save();
  }

  async getAll(): Promise<InterestUserDocument[]> {
    return this.interestUserModel.find().populate('User', 'Name').populate('Interest', 'NameFr');
  }

  async getMatches(uid: string) {
    const user = await (await this.auth.findOne(uid)).depopulate('Interests');

    const users = await this.interestUserModel.find({
      User: { $ne: user._id },
      $or: [
        { Interest: user.Interests[0] },
        { Interest: user.Interests[1] },
        { Interest: user.Interests[2] },
        { Interest: user.Interests[3] },
        { Interest: user.Interests[4] },
      ]
    }).populate('User')
      .select("User").exec();
    const Users: any[] = []


    users.map((user: any) => {
      Users.push(user.User)
    })

    const Uniq = new Set([...Users]);
    const tab = Array.from(Uniq);
    const matches: any[] = [];
    const percent = Math.round(100 / user.Interests.length);
  
    
    tab.map((userFormatch)=>{
      const res = {
        uid: userFormatch.uid,
        matchRate: 0
      }
      userFormatch.Interests.map((it: any)=>{
        user.Interests.some(function (interest: any) {
          if(interest.equals(it)){
            res.matchRate+= percent
          }
         })  
      })
      if(res.matchRate != 0) matches.push(res);
    })

    return matches;


  }

  matche(a: any[], interests: any[], uid: string) {
    const percent: number = Math.round(100 / a.length);
    const res = {
      uid: uid,
      matchRate: 0
    }
    a.map((interest: any) => {
      interests.map((Oi: any) => {
        const rest = interest.equals(Oi);
        console.log(rest);

        if (rest) {
          res.matchRate += percent;
        }
      })
    })
    if (res.matchRate == 0) {
      return false;
    }

    return res
  }


  async GetMatches(MyInterest: any[], users: any[]) {
    console.log(MyInterest);

    const Result: any[] = [];
    users.map((user: any) => {
      const res = this.matche(MyInterest, user.Interests, user.uid);
      if (res) {
        Result.push(res)
      }
    })

    return Result;
  }

}
