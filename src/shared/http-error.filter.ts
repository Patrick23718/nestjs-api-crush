import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from "@nestjs/common";
import { response } from "express";

@Catch()
export class HttpErrorFilter implements ExceptionFilter{
  catch(exception: any, host: ArgumentsHost): any {
    const contexte = host.switchToHttp()
    const request = contexte.getRequest()
    const response = contexte.getResponse()
    try {
      let status = exception.response.statusCode

      const errorResponse = {
        code: status,
        timestamp: new Date().toLocaleDateString(),
        path: request.url,
        method: request.method,
        message: exception
      }

      Logger.error(`[${status}] - ${request.method} - ${request.url} `, JSON.stringify(errorResponse) + '\n' + exception.stack, 'ExceptionFilter')
      response.status(status).json(errorResponse)
    }catch (e) {
      Logger.error(`[${HttpStatus.INTERNAL_SERVER_ERROR}] - ${request.method} - ${request.url} `, JSON.stringify(e) + '\n' + exception.stack, 'ExceptionFilterError')
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"test"})
    }

  }

}