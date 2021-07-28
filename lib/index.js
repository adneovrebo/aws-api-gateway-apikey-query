"use strict";
exports.__esModule = true;
// @ts-ignore
var apiKeyQueryAuthorizer = function (event, _context, callback) {
    // Get the api key from stage or queryString
    var apikey = event.queryStringParameters.apikey || event.stageVariables.apikey;
    // Deconstructing arn to use when reconstructing the GET/*
    var tmp = event.methodArn.split(":");
    var apiGatewayArnTmp = tmp[5].split("/");
    var awsAccountId = tmp[4];
    var region = tmp[3];
    var restApiId = apiGatewayArnTmp[0];
    var stage = apiGatewayArnTmp[1];
    callback(null, {
        principalId: "principalId",
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: "Allow",
                    Resource: "arn:aws:execute-api:" + region + ":" + awsAccountId + ":" + restApiId + "/" + stage + "/*/*"
                },
            ]
        },
        usageIdentifierKey: apikey
    });
};
exports["default"] = apiKeyQueryAuthorizer;
