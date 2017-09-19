"use strict";
/*
 Mimicks the request event object
 http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html
 */
module.exports = function createLambdaEdgeContext(
  request,
  options,
  stageVariables
) {
  return {
    Records: [
      {
        cf: {
          config: {
            distributionId: "EDFDVBD6EXAMPLE"
          },
          request: {
            clientIp: request.connection.remoteAddress,
            method: request.method.toUpperCase(),
            uri: request.route.path,
            headers: request.headers
          }
        }
      }
    ]
  };
};
