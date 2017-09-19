'use strict';

const _ = require('lodash');

/*
 Mimicks the request event object
 http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html
 */
module.exports = function createLambdaEdgeContext(
  request,
  options,
  stageVariables
) {
  const headers = {};

  Object.keys(request.headers).forEach(k => {
    headers[k] = [
      {
        key: _.startCase(_.toLower(k)).replace(' ', '-'),
        value: request.headers[k],
      },
    ];
  });

  return {
    Records: [
      {
        cf: {
          config: {
            distributionId: 'EDFDVBD6EXAMPLE',
          },
          request: {
            clientIp: request.connection.remoteAddress,
            method: request.method.toUpperCase(),
            uri: request.route.path,
            headers,
          },
        },
      },
    ],
  };
};
