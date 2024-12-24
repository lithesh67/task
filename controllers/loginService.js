const express=require('express');
const db=require('../database/db');
const jwt=require('jsonwebtoken');


const loginUser=(req,res)=>{
    const {user,pass}=req.body; //object destructuring
    console.log(user);
    db.query('select * from users where username=? and password=?',[user,pass],(err,result)=>{
        if(err){
            console.log(err);
        }
        else if(result.length>0){
            const token=jwt.sign({user:{username:result[0].username,id:result[0].id }},
                process.env.secretKey,
                {expiresIn:'5m'});
            res.json({message:"Login successful",token});
        }
        else{
            res.json({message:"Wrong credentials"});
        }
    }); 
};

const logoutUser=(req,res)=>{
    res,json({message:"Logged out"});
};
module.exports={loginUser,logoutUser};