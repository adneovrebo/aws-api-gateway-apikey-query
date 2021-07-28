// @ts-ignore
const apiKeyQueryAuthorizer = (
  event: {
    queryStringParameters: { apikey: string };
    stageVariables: { apikey: string };
    methodArn: string;
  },
  _context: any,
  callback: (
    arg0: null,
    arg1: {
      principalId: string; // not relevant here
      policyDocument: {
        Version: string;
        Statement: { Action: string; Effect: string; Resource: string }[];
      };
      usageIdentifierKey: string;
    }
  ) => void
) => {
  // Get the api key from stage or queryString
  const apikey =
    event.queryStringParameters.apikey || event.stageVariables.apikey;

  // Deconstructing arn to use when reconstructing the GET/*
  const tmp = event.methodArn.split(":");
  const apiGatewayArnTmp = tmp[5].split("/");
  const awsAccountId = tmp[4];
  const region = tmp[3];
  const restApiId = apiGatewayArnTmp[0];
  const stage = apiGatewayArnTmp[1];

  callback(null, {
    principalId: "principalId", // Not in use
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: `arn:aws:execute-api:${region}:${awsAccountId}:${restApiId}/${stage}/*/*`,
        },
      ],
    },
    usageIdentifierKey: apikey,
  });
};
export default apiKeyQueryAuthorizer;
