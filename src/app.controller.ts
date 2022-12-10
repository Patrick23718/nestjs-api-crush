import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AppService } from './app.service';
import { TokenVerifyGuard } from "./shared/token-verify/token-verify.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(TokenVerifyGuard)
  getHello(@Req() request): string {
    return this.appService.getHello(request.userId);
  }
}
