const User = require("../models/userModel")
const dotenv = require("dotenv")
const sendGrid = require("@sendgrid/mail")
dotenv.config()

const SENDGRID_KEY = process.env.SENDGRID_KEY;
sendGrid.setApiKey(SENDGRID_KEY)

exports.addAccount = async (req,res) => {
  try{  

    const {account,balance,status,dogePayment} = req.body;

    const existingUser = await User.findOne({account});

    if(existingUser){
      return res.json({errorMessage: "Already claimed"});
    }

    const newUser = new User({
      account,
      balance,
      status,
      dogePayment
    })

    const savedUser = await newUser.save()

    res.send(savedUser)

  }catch(err){
    console.log(err)
  }
}

exports.getAccounts = async (req,res) => {
  try{
    const data = await User.find({})
    res.send(data)
  }catch(err){
    console.log(err)
  }
}

exports.updateAccountStatus = async (req,res) => {
  try{
    const {account,status} = req.body;
    await User.updateOne({account:account}, {$set:{status:status}})
    
    return res.json("updated")
  }catch(err){
    console.log(err)
  }
}

exports.deleteAccount = async (req,res) => {
  try{
    const {account} = req.body;
    const response = await User.deleteOne({account:account})

    res.send(response)
  }catch(err){
    console.log(err)
  }
}

exports.updateAccountDogeRequired = async (req,res) => {
  try{
    const {account,dogePayment} = req.body;
    await User.updateOne({account:account}, {$set:{dogePayment:dogePayment}})
    return res.json("updated")
  }catch(err){
    console.log(err)
  }
}

exports.sendEmail = async (req,res) => {
  try{

    const {receiverEmail} = req.body;

    await sendGrid.send({
      to:{
        email: receiverEmail,
      },
      from:{
        email: process.env.EMAIL,
        name: "Nemesis Downfall"
      },
      templateId: "d-29f5d006c1354f2890ffa44616ea33fd",
    })

    res.send("Email Sent")
  }catch(err){
    console.log(err)
  }
}


//   
