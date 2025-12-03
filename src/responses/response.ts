// const messageTypes = require('../responses/types')
import { ResponseStatus } from "../responses/code";
import Logger from "../responses/logger";
// import {  Messages } from "../models";
class Response {
  async success(
    req: any,
    res: any,
    status: any,
    data: any,
    message = "success"
  ) {
    try {
      // Logger.consoleLog(req, status, { message, data }, "API_CALL");

      if (data == null) {
        data._id = "";
      }
      if (status == ResponseStatus.HTTP_OK) {
        //req.appLogger.info(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | Request : ${JSON.stringify(req.value?req.value:{})} | Response :  ${JSON.stringify(data)}`)
        //   req.winstonLogger.logger.log('info', `Requesting ${req.method} ${req.originalUrl}`, { tags: `${req.originalUrl}`, additionalInfo: { body: req.body, responseTime: res.responseTime, status: status, message: message,UserId:data._id,headers: req.headers } });
      } else {
        // req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | Request : ${JSON.stringify(req.value?req.value:{})} | Error : ${message}`)
        //   req.winstonLogger.logger.log('info', `Requesting ${req.method} ${req.originalUrl}`, { tags: `${req.originalUrl}`, additionalInfo: { body: req.body, responseTime: res.responseTime, status: status, message: message,UserId: data._id, headers: req.headers } });
      }

      // console.log("API Success");
      console.log(`URL : ${req.protocol} success`);
      console.log(`URL 3 : ${JSON.stringify(req.value?req.value:{})} success`);
      return res.status(status).json({
        status,
        message,
        data,
      });
    } catch (error) {
      console.error("************************** Response success", error);
      Logger.consoleLog(req, status, error, "ERROR");
      return res.status(status).json({
        status,
        message,
      });
    }
  }

  async errors(req: any, res: any, status: any, message: any) {
    try {
      Logger.consoleLog(req, status, message, "ERROR");
      return res.status(status).json({
        status,
        message,
      });
    } catch (error) {
      console.error("************************** errors", error);
      return res.status(status).json({
        status,
        message,
      });
    }
  }

  joierrors(req: any, res: any, err: any) {
    let error = err.details.reduce((prev: any, curr: any) => {
      prev[curr.path[0]] = curr.message.replace(/"/g, "");
      return prev;
    }, {});
    let message = "Bad Request";
    let status = ResponseStatus.HTTP_BAD_REQUEST;
    return res.status(status).json({
      status,
      message,
      error,
    });
  }
}

// export = { Response };
export default new Response();
// module.exports = new Response();
