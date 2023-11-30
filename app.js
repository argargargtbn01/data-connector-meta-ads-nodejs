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
  "EAAJxZBG7krGoBO8dDuYSmRUSke2ZCksihgTQHQLPPcJoYIn4KWsOKFW9UF1XutktEhU3t0AB3CeZAuivzBvSWPlWg1r93UuzvfwpZCyOYDAPGVieqwDedhgWyCuDQEDVREUYlFGBPOSVJ0LO68tT4QUvkVgliEcZB6wzDELplXEaHYWrFKswAQv7h";
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

const id = 'app1.js'
const api = FacebookAdsApi.init(access_token);





const uploadAdImage = async (filePath,access_token) => {
  const formData = new FormData();
  // Ensure the file exists
  if (!fs.existsSync(filePath)) {
    throw new Error('File not found');
  }

  const fileName = path.basename(filePath);
  const fileStream = fs.createReadStream(filePath);
  // formData.append("filename", fileName);
  formData.append("filename", fileStream);
  formData.append("access_token", access_token);
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
const filePath = "C:/Users/p/OneDrive/Pictures/Saved Pictures/NguyenMinhQuang_21020230_K66TCLC.jpg";

// uploadAdImage().then(data => console.log(data)).catch(err => console.error('err'));


const uploadAdCreative = async (filePath,access_token) => {
  const fileName = path.basename(filePath);
  const hash = (await uploadAdImage(filePath,access_token)).images[`${fileName}`].hash
  // now only support add image as creative
  const formData = new FormData();
  const object_story_spec = JSON.stringify({
    page_id: "185517334638924",
    link_data: {
        image_hash: `${hash}`,
        link: "https://www.facebook.com/profile.php?id=61553684112788"
    }
  })

  formData.append("name", fileName);
  formData.append("access_token", access_token);
  formData.append("object_story_spec", object_story_spec);
  try {
    const response = await axios({
      method: "POST",
      url: "https://graph.facebook.com/v18.0/act_403450566983410/adcreatives",
      headers: {
        ...formData.getHeaders(),
      },
      data: formData,
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading creative:');
    throw error;
  }
};

const test = await uploadAdCreative(filePath,access_token)

const uploadAdVideo = async (videoPath, accessToken) => {
  const videoName = path.basename(videoPath);
  const url = `https://graph.facebook.com/v18.0/act_403450566983410/advideos`;

  const formData = new FormData();
  formData.append('access_token', accessToken);
  formData.append('source', fs.createReadStream(videoPath));
  // formData.append('name', videoName);

  try {
    const response = await axios.post(url, formData, {
      headers: formData.getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading video:');
  }
};
const videoFilePath = 'C:/Users/p/Downloads/Flip a clip video ngắn 5 giây.mp4'
// const testVideo = await uploadAdVideo(videoFilePath,access_token)
// console.log(testVideo)

const uploadVideoAdCreative = async (thumbnailFilePath,filePath,access_token) => {
  const fileName = path.basename(filePath);
  const adVideoId = (await uploadAdVideo(filePath,access_token)).id
  const thumbnailFileName = path.basename(thumbnailFilePath);
  const imageHash = (await uploadAdImage(thumbnailFilePath,access_token)).images[`${thumbnailFileName}`].hash
  // now only support add video as creative
  const formData = new FormData();
  const object_story_spec = JSON.stringify({
    page_id: "185517334638924",
    video_data: {
        video_id: adVideoId,
        image_hash: imageHash
    }
  })

  formData.append("name", fileName);
  formData.append("access_token", access_token);
  formData.append("object_story_spec", object_story_spec);
  try {
    const response = await axios({
      method: "POST",
      url: "https://graph.facebook.com/v18.0/act_403450566983410/adcreatives",
      headers: {
        ...formData.getHeaders(),
      },
      data: formData,
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading creative:');
    throw error;
  }
};
const thumbnailFilePath = "C:/Users/p/OneDrive/Pictures/Saved Pictures/NguyenMinhQuang_21020230_K66TCLC.jpg";

const adImageVideo = await uploadVideoAdCreative(thumbnailFilePath,videoFilePath,access_token)
console.log(adImageVideo)
