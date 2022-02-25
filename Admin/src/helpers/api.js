import axios from "axios";

import * as c from "./const";


export async function getUsers() {
  try{
    let url = `${c.LOCALSERVER}/all`;
    let res = await axios.get(url);
    return res;
  }catch(e) {
    console.log(e)
  }
}

export async function approveUser(account,status) {
  try{
    let url = `${c.LOCALSERVER}/update`;
    let res = await axios.post(url, {account,status});
    return res;
  }catch(e) {
    console.log(e)
  }
}

export async function deleteUser(account) {
  try{
    let url = `${c.LOCALSERVER}/delete`;
    let res = await axios.post(url, {account})
    return res;
  }catch(e){
    console.log(e)
  }
}

export async function updateDogeRequire(account, dogePayment) {
  try{
    let url = `${c.LOCALSERVER}/update/doge`;
    let res = await axios.post(url, {account,dogePayment});
    return res;
  }catch(e) {
    console.log(e)
  }
}
