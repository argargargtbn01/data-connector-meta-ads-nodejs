import {
  AdAccount,
  Campaign,
  FacebookAdsApi,
} from "facebook-nodejs-business-sdk";
("use strict");

const access_token =
  "EAAJxZBG7krGoBOxsa4aEEy6bScqqcMX4G19SvcVbRBtxt4wfbXZBuMIFnSZBPSpHSMvR8BijUqn2WBnzGrLKb2g8h4df4mnfpGkkw5xvhmPLmpBZBotVvzC14d8qyh6Rs1FZAB7v4NvGor3o5coMFFTe0QAqPDiY2kHIu13SZBG9vNypLZBeLfjqznD";
const app_secret = "<APP_SECRET>";
const app_id = "<APP_ID>";
const id = "act_403450566983410"; // ad_account_id

const api = FacebookAdsApi.init(access_token);
const showDebugingInfo = true; // Setting this to true shows more debugging info.
if (showDebugingInfo) {
  api.setDebug(true);
}

const logApiCallResult = (apiCallName, data) => {
  console.log(apiCallName);
  if (showDebugingInfo) {
    console.log("Data:" + JSON.stringify(data));
  }
};

let fields, params;
fields = [];
params = {
  name: "My First Campaign create",
  objective: "OUTCOME_LEADS", // Objective must be one of: OUTCOME_LEADS, OUTCOME_SALES, OUTCOME_ENGAGEMENT, OUTCOME_AWARENESS, OUTCOME_TRAFFIC, OUTCOME_APP_PROMOTION
  special_ad_categories: ["NONE"], // should hard fix ( idk why )
};
const campaigns = new AdAccount(id).createCampaign(fields, params);
logApiCallResult("campaigns api call complete.", campaigns);
