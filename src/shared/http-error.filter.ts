import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";

@Catch()
export class HttpErrorFilter implements ExceptionFilter{
  catch(exception: any, host: ArgumentsHost): any {
    const contexte = host.switchToHttp()
    const request = contexte.getRequest()
    const response = contexte.getResponse()
    let status = exception.getStatus() || null

    const errorResponse = {
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: exception || null
    }

    Logger.error(`[${status}] - ${request.method} - ${request.url} `, JSON.stringify(errorResponse) + '\n' + exception.stack, 'ExceptionFilter')
    response.status(status).json(errorResponse)
  }

}