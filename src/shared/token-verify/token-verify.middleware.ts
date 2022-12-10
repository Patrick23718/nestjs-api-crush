import {
  ForbiddenException,
  Injectable, Logger,
  NestMiddleware,
  NotAcceptableException,
  UnauthorizedException
} from "@nestjs/common";
import { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";


@Injectable()
export class TokenVerifyMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: () => void) {
    // const token = request.headers.authorization || null
    // if(token && token !== "") {
    //   getAuth().verifyIdToken(token).then((decodeToken) => {
    //     console.log(decodeToken);
    //     request['userId'] = decodeToken.uid;
    //     next()
    //   }).catch((error)=>{
    //     // throw new UnauthorizedException()
    //     Logger.error(`${request.method} - ${request.url} `,  error, 'FirebaseToken')
    //     response.status(401).json({message: "test"})
    //   })
    // }else{
    //   throw new UnauthorizedException()
    // }
    // next();
  }
}
