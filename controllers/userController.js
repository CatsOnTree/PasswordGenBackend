import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const registerUser = asyncHandler(async (req, res) => {
  const { name, mobile, aadharno, college } = req.body;
  let lsit = ["!", "@", "#", "$", "?"];

  const random3nos = ()=>{
    let randno = Math.random()
    return randno>=0.1 ? randno*1000 : randno*10000;
 }
  if (!name || !mobile || !aadharno || !college){
    res.status(401);
    throw new Error("Some deatils are missing") 
  }

  const newPassword = name.slice(0, 2) + mobile.toString().slice(-4, -1) + aadharno.toString().slice(0, 3) + college.slice(0, 2) + random3nos().toString().slice(0, 3) + lsit[((Math.random() * 10) / 2).toString().slice(0, 1)];
  
  if(!newPassword){
    res.status(401);
    throw new Error("Error creating the password")
  }

  const userCreated = await User.create({name,mobile,aadharno,college,password:newPassword});

  if(userCreated){
    res.json({message:"user created successfully",user:userCreated})
  }else{
    res.status(401);
    throw new Error("user registration failed");
  }

});

const loginUser = asyncHandler(async (req,res)=>{
    const {mobile,password} = req.body;
    if(!mobile || !password){
      res.status(401);
      throw new Error("ALl fields required!")
    }

    const findUser = await User.findOne({mobile})

    if(findUser){
      if(findUser.password == password){
        res.json({id:findUser._id});
      }else{
        res.status(401);
        throw new Error("password is incorrect")
      }
    }else{
      res.status(401);
      throw new Error("user not found") 
    }

});

const currentUser = asyncHandler(async (req,res)=>{
  const user = await User.findById(req.params.id).select("-password");
  res.json(user)
})

const getAllUsers = asyncHandler(async (req,res)=>{
  const id = req.params.id
  if(!id){
    res.status(401);
    throw new Error("user not found")
  }else{
    if(id ==  process.env.ADMIN_ID){
      const users = await User.find();
      res.json(users)
    }else{
      res.status(401);
      throw new Error("user not found")
    }
  }
})

const currentUserPassword = asyncHandler(async (req,res)=>{
  const user = await User.findById(req.params.id).select("password");
  res.json(user)
})

const coldStartServer = asyncHandler(async (req,res) => {
    res.send("connected to server")
})



export { registerUser, loginUser, currentUser , currentUserPassword , getAllUsers, coldStartServer};
