import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { InterestsModule } from "./interests/interests.module";
import { HttpErrorFilter } from "./shared/http-error.filter";
import { LoggingInterceptor } from "./shared/logging.interceptor";
import { TokenVerifyMiddleware } from "./shared/token-verify/token-verify.middleware";
// import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_DB_URL,{dbName: process.env.DB_NAME}), AuthModule, InterestsModule, PostsModule],
  controllers: [AppController],
  providers: [{
    provide: APP_FILTER,
    useClass: HttpErrorFilter
  },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }, AppService],
})
export class AppModule{
  // configure(consumer: MiddlewareConsumer): any {
  //   consumer.apply(TokenVerifyMiddleware).forRoutes({
  //     path: '*', method: RequestMethod.ALL
  //   })
  // }

}
