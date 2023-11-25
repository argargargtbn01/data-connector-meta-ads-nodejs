
'use strict';
const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;

const access_token = 'EAAJxZBG7krGoBO0YFlfKRBZA4zkk1hYyiNZAumDhaF0GGR8Xh6p2ZBCMxi3iVUh0ZBCoHubZCGn42rQ5PLrpWcTZClo7nAJSREyznnjBjKGpjxnrbD50yp2735gFoja0I5UJWjO7T7WeuM6cdfFb7xKgJPKa4IZCsFQBqgtmzhtkf1GjnMmOZBHM6ZByzU9I9mUjYyRdfWYlKRx34CnSGzXLjmHoTX7w0ZD';
const app_secret = '<APP_SECRET>';
const app_id = '<APP_ID>';
const id = 'act_403450566983410'; // ad_account_id

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
];
params = {
    'name' : 'My First Campaignwtfg',
    'objective' : 'OUTCOME_LEADS', // Objective must be one of: OUTCOME_LEADS, OUTCOME_SALES, OUTCOME_ENGAGEMENT, OUTCOME_AWARENESS, OUTCOME_TRAFFIC, OUTCOME_APP_PROMOTION
    'special_ad_categories' : ['NONE'], // should hard fix ( idk why )
};
const campaigns = (new AdAccount(id)).createCampaign(
  fields,
  params
);
logApiCallResult('campaigns api call complete.', campaigns);

