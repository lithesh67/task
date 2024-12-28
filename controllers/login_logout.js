const express=require('express');
const db=require('../database/db');
const jwt=require('jsonwebtoken');

async function userExists(user){
    try {
        const result = await db.query('select * from users where username=?', [user]);
        if (result[0].length>0){
            return true;
        }
        return false;
    } catch (error) {
        console.log(error); 
    }
}

const registerUser=async(req,res)=>{ 
    const {user,pass,email,}=req.body;
    if (await userExists(user)===true){  
        return res.json({message:"User already exists",bool:false});
    }
    try{
        const result=await db.query('insert into users(username,password,email) values(?,?,?)',[user,pass,email]);
        res.json({message:"User registered",bool:true});
    }
    catch(err){
        console.log(err);
    } 
} 

const loginUser=async(req,res)=>{
    const {user,pass}=req.body; //object destructuring
    try{
       const result=await db.query('select * from users where username=? and password=?',[user,pass]);
       if (result[0].length>0){
           const token=jwt.sign({user:{username:result[0][0].username,id:result[0][0].id}},
               process.env.secretKey,
               {expiresIn:'5m'});
           res.cookie("token",token,{httpOnly:true});
           res.json({message:"Login successful",token,bool:true});
       }
       else{
           res.clearCookie("token",{httpOnly:true});
           res.json({message:"Wrong credentials",bool:false});
       }
    }
    catch(err){
        console.log(err);
    }
}
const logoutUser=(req,res)=>{
    res.clearCookie("token",{httpOnly:true});
    res.json({message:"Logged out",bool:true});

};
module.exports={loginUser,logoutUser,registerUser};