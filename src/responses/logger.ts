class Logger {
  error(arg0: string, arg1: { message: any; stack: any; }) {
    throw new Error("Method not implemented.");
  }
  info // requestId: pathOr(null, requestId, request),
    (arg0: string) {
      throw new Error("Method not implemented.");
  }
  async consoleLog(req: any, status: any, data: any, loggerMessage: string) {
    try {
      let now = Date.now();
      var responseTime = Date.now() - req.start;
      if (req.path == "/login") {
        delete req.body.password;
      }
      console.info(
        `${loggerMessage}`,
        JSON.stringify({
          httpRequest: {
            status: status,
            requestUrl: req.path,
            requestReceivedTime: req.start,
            responseTime: responseTime,
            // requestId: pathOr(null, requestId, request),
            latency: {
              seconds: responseTime / 1000,
              nano: Math.round(responseTime * 1000 * 1000),
            },
            requestMethod: req.method ? req.method.toUpperCase() : '',
            // responseSize: pathOr(0, responseSizeKeys, request),
            user: req.user,
            timestamp: now,
            origin: req.headers["x-forwarded-for"] || req.ip,
            path: req.path,
            userAgent: req.headers["user-agent"],
            remoteIp: req.headers["x-forwarded-for"] || req.ip,
          },
          user: req.user,
          timestamp: now,
          origin: req.headers["x-forwarded-for"] || req.ip,
          path: req.path,
          userAgent: req.headers["user-agent"],
          deviceBuildNum: req.headers["x-build-num"],
          deviceOs: req.headers["x-device-os"],
          deviceName: req.headers["x-device-name"],
          deviceId: req.headers["x-device-id"],
          uniqueDeviceId: req.headers["x-unique-device-id"],
          statusCode: status,
          method: req.method.toUpperCase(),
          requestData: {
            params: req.params ? JSON.stringify(req.params) : "",
            body: req.body ? JSON.stringify(req.body) : "",
            query: req.query ? JSON.stringify(req.query) : "", //Object.assign({}, request.query)
          },
          responseData: data ? JSON.stringify(data) : "", //JSON.stringify(decryptResponse(pathOr(400, responseDataKeys, request))) || ''
        })
      );
    } catch (e) {
      console.error("logger error", e);
    }
  }
}

export default new Logger();
