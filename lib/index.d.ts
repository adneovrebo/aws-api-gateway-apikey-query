declare const apiKeyQueryAuthorizer: (event: {
    queryStringParameters: {
        apikey: string;
    };
    stageVariables: {
        apikey: string;
    };
    methodArn: string;
}, _context: any, callback: (arg0: null, arg1: {
    principalId: string;
    policyDocument: {
        Version: string;
        Statement: {
            Action: string;
            Effect: string;
            Resource: string;
        }[];
    };
    usageIdentifierKey: string;
}) => void) => void;
export default apiKeyQueryAuthorizer;
