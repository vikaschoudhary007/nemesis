import axios from "axios";

import * as c from "./const";


export async function addUser(account,balance,status, dogePayment) {
  try{
    let url = `${c.LOCALSERVER}/add`;
    let res = await axios.post(url, {account,balance,status, dogePayment});
    return res;
  }catch(e) {
    console.log(e)
  }
}

export async function sendEmail(receiverEmail) {
  try{
    let url = `${c.LOCALSERVER}/sendmail`;
    let res = await axios.post(url, {receiverEmail});
    return res;
  }catch(e) {
    console.log(e)
  }
}