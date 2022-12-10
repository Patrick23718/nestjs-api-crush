import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Observable } from 'rxjs';
import { getAuth } from "firebase-admin/auth";
import { auth } from "firebase-admin";
import DecodedIdToken = auth.DecodedIdToken;


@Injectable()
export class TokenVerifyGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ){
    const request = context.switchToHttp().getRequest()
    let val: boolean = false;

    const token = request.headers.authorization || null
    // console.log(token)
    if(token && token !== "") {

      try{
        const decodeToken = await getAuth().verifyIdToken(token)
        // console.log(decodeToken);
        request['userId'] = decodeToken.uid;
        request['userPhoneNumber'] = decodeToken.phone_number
        return true
      }catch (e) {
        return false
      }
    }else{
      return false
    }

  // return val

  }
}
