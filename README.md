# AWS API-Gateway API-key query

Function for allowing to pass API-Gateway generated api-keys as queryparameter. Allows for some edge-case usage. 

This allows for the following usage with AWS API-key managing:
```
https://some-url/prod/transaction?apikey=some-api-key
```

## Lambda setup
```bash
# Install dependency in lambda function
npm i @adneovrebo/api-gateway-apikey-query-authorizer
```

```typescript
// In your authorizer lambda function add the following
import apiKeyQueryAuthorizer from '@adneovrebo/api-gateway-apikey-query-authorizer';

exports.handler = apiKeyQueryAuthorizer;
```

```bash
# ZIP content and deploy lambda function with aws-cli (or any other way you like)
zip -r authorizer.zip . && aws lambda update-function-code --function-name <FunctionName> --zip-file fileb://authorizer.zip
```

## Configure API-gateway

1. Create authorizer with the deployed lambda function
![Create Authorizer](https://raw.githubusercontent.com/adneovrebo/aws-api-gateway-apikey-query/master/images/create-authorizer.png "Create Authorizer")

2. Go to settings and select ``API Key Source`` to be ``AUTHORIZER``

3. On the selected request select the authorizer and set ```API Key Required``` to ```true```
![Create Authorizer](https://raw.githubusercontent.com/adneovrebo/aws-api-gateway-apikey-query/master/images/set-authorizer-on-method.png "Create Authorizer")

4. Deploy API for changes to take effect.

5. Create usage plans and API keys to the desired API. 

Happy coding 🎉