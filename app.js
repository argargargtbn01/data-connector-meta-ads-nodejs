
'use strict';
const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;

const access_token = 'EAAJxZBG7krGoBO0YFlfKRBZA4zkk1hYyiNZAumDhaF0GGR8Xh6p2ZBCMxi3iVUh0ZBCoHubZCGn42rQ5PLrpWcTZClo7nAJSREyznnjBjKGpjxnrbD50yp2735gFoja0I5UJWjO7T7WeuM6cdfFb7xKgJPKa4IZCsFQBqgtmzhtkf1GjnMmOZBHM6ZByzU9I9mUjYyRdfWYlKRx34CnSGzXLjmHoTX7w0ZD';
const app_secret = '<APP_SECRET>';
const app_id = '<APP_ID>';
const id = 'act_403450566983410'; // ad account id
const api = bizSdk.FacebookAdsApi.init(access_token);
const showDebugingInfo = true; // Setting this to true shows more debugging info.
if (showDebugingInfo) {
  api.setDebug(true);
}

const logApiCallResult = (apiCallName, data) => {
  console.log(apiCallName);
  if (showDebugingInfo) {
    console.log('Data:' + JSON.stringify(data));
  }
};

let fields, params;
fields = [
  'name',
  'objective',
];
params = {
  'effective_status' : ['ACTIVE','PAUSED'],
};
const campaignss = (new AdAccount(id)).getCampaigns(
  fields,
  params
);
const adSets = (new AdAccount(id)).getAdSets(
    fields,
    params
  );
  const adCreatives = (new AdAccount(id)).getAdCreatives(
    fields,
    params
  );
logApiCallResult('campaignss api call complete.', campaignss);
logApiCallResult('adsets api call complete.', adSets);
logApiCallResult('adCreatives api call complete.', adCreatives);
