import { AdAccount, Campaign, FacebookAdsApi } from 'facebook-nodejs-business-sdk';

'use strict';


const access_token = 'EAAJxZBG7krGoBOxsa4aEEy6bScqqcMX4G19SvcVbRBtxt4wfbXZBuMIFnSZBPSpHSMvR8BijUqn2WBnzGrLKb2g8h4df4mnfpGkkw5xvhmPLmpBZBotVvzC14d8qyh6Rs1FZAB7v4NvGor3o5coMFFTe0QAqPDiY2kHIu13SZBG9vNypLZBeLfjqznD';
const app_secret = '<APP_SECRET>';
const app_id = '<APP_ID>';
const id = 'act_403450566983410'; // ad_account_id

const api = FacebookAdsApi.init(access_token);
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

const creativeData = {
  name: 'My Creative',
  object_story_spec: {
    page_id: 'your_page_id',
    link_data: {
      image_hash: 'image_hash_here', // You can use an image from your image library
      link: 'https://example.com',
      message: 'Check out our new product!',
    },
  },
};


let fields, params;
fields = [
];
params = {
  name: 'My Creative',
  object_story_spec: {
    page_id: '185517334638924',
    "instagram_actor_id": "7073391302720907",
        "photo_data": {
          "caption": "Haha1",
          "url": "https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-1/405516432_122104720226122803_6434901890835214148_n.png?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=44_22PCLuVkAX8_ETf5&_nc_ht=scontent.fhan5-11.fna&oh=00_AfCASuwPtyoz-wYunIA4jNac6kBwX7WVM1g3Ks_awwzyPA&oe=65678B90",
          "image_hash": "1a7a3c50f56c01036086b997c4d4a1a3"
        }
  },
  id: "120202320350590628"
};
const adCreative = (new AdAccount(id)).createAdCreative(
  fields,
  params
);
logApiCallResult('ad creative api call complete.', adCreative);

