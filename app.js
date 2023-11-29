import {
  AdAccount,
  Campaign,
  FacebookAdsApi,
} from "facebook-nodejs-business-sdk";
import axios from "axios";
import  FormData from "form-data";
import fs from "fs";
import path from "path";

("use strict");
// const bizSdk = require('facebook-nodejs-business-sdk');
// const AdAccount = bizSdk.AdAccount;
// const Campaign = bizSdk.Campaign;

// const AdAccount = AdAccount;
// const Campaign = Campaign;

const access_token =
  "EAAJxZBG7krGoBOxsa4aEEy6bScqqcMX4G19SvcVbRBtxt4wfbXZBuMIFnSZBPSpHSMvR8BijUqn2WBnzGrLKb2g8h4df4mnfpGkkw5xvhmPLmpBZBotVvzC14d8qyh6Rs1FZAB7v4NvGor3o5coMFFTe0QAqPDiY2kHIu13SZBG9vNypLZBeLfjqznD";
const app_secret = "<APP_SECRET>";
const app_id = "<APP_ID>";
const getAdAccountId = async (access_token) => {
  const adaccounts = await axios({
    method: "GET",
    url: `https://graph.facebook.com/v18.0/me/adaccounts`,
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      access_token:
        "EAAJxZBG7krGoBOxsa4aEEy6bScqqcMX4G19SvcVbRBtxt4wfbXZBuMIFnSZBPSpHSMvR8BijUqn2WBnzGrLKb2g8h4df4mnfpGkkw5xvhmPLmpBZBotVvzC14d8qyh6Rs1FZAB7v4NvGor3o5coMFFTe0QAqPDiY2kHIu13SZBG9vNypLZBeLfjqznD",
    },
  });
  return adaccounts.data.data[0].id;
};

const id = await getAdAccountId(access_token); // ad_account_id
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

const uploadAdImage = async () => {
  const filePath = "C:/Users/PC/OneDrive/Pictures/Saved Pictures/NguyenMinhQuang_21020230_K66TCLC.jpg";
  const formData = new FormData();

  // Ensure the file exists
  if (!fs.existsSync(filePath)) {
    throw new Error('File not found');
  }

  const fileName = path.basename(filePath);
  const fileStream = fs.createReadStream(filePath);

  // formData.append("filename", fileName);
  formData.append("filename", fileStream);
  formData.append("access_token", "EAAJxZBG7krGoBOxsa4aEEy6bScqqcMX4G19SvcVbRBtxt4wfbXZBuMIFnSZBPSpHSMvR8BijUqn2WBnzGrLKb2g8h4df4mnfpGkkw5xvhmPLmpBZBotVvzC14d8qyh6Rs1FZAB7v4NvGor3o5coMFFTe0QAqPDiY2kHIu13SZBG9vNypLZBeLfjqznD");
  try {
    const response = await axios({
      method: "POST",
      url: "https://graph.facebook.com/v18.0/act_403450566983410/adimages",
      headers: {
        ...formData.getHeaders(),
      },
      data: formData,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading image:');
    throw error;
  }
};

uploadAdImage().then(data => console.log(data)).catch(err => console.error('err'));
let fields = [];
let params = {
  filename:
    "@C:/Users/PC/OneDrive/Pictures/Saved%20Pictures/NguyenMinhQuang_21020230_K66TCLC.jpg",
};
// const zz = new AdAccount(id).createAdImage(fields, params);

let params1 = {
  name: "Ad Sample Creative",
  object_story_spec: {
    page_id: "185517334638924",
    link_data: {
      image_hash: "edcd9011b3e18c83f69db68738e7c159",
      link: "https://www.facebook.com/profile.php?id=61553684112788",
      message: "Try it out",
    },
  },
};
// const zzz = new AdAccount(id).createAdCreative(fields, params1);

// logApiCallResult("adCreatives api call complete.", zz);
// logApiCallResult("adCreatives api call complete.", zzz);
