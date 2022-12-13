import { AuthModule } from './../auth/auth.module';
import { InterestsUserController } from './interest_user.controller';
import { InterestUser, InterestUserSchema } from './schemas/interests_user.schema';
import { Module } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { InterestsController } from './interests.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Interest, InterestSchema } from "./schemas/interest.schema";
import { InterestsUserService } from './intersest_user.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Interest.name, schema: InterestSchema },
      {name: InterestUser.name, schema: InterestUserSchema}
    ]),
  ],
  controllers: [InterestsController, InterestsUserController],
  providers: [InterestsService,InterestsUserService]
})

export class InterestsModule {}
