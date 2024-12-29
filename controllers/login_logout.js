const db=require('../database/db');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

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
        password=await bcrypt.hash(pass,10);
        const result=await db.query('insert into users(username,password,email) values(?,?,?)',[user,password,email]);
        res.json({message:"User registered",bool:true});
    }
    catch(err){
        console.log(err);
    } 
} 

const loginUser=async(req,res)=>{
    const {user,pass}=req.body; //object destructuring
    try{
       const dbData=await db.query('select * from users where username=?',[user]);
       if(dbData[0].length>0 && await bcrypt.compare(pass,dbData[0][0].password)){
            const token=jwt.sign({user:{username:dbData[0][0].username,id:dbData[0][0].id}},
            process.env.secretKey,
            {expiresIn:'5m'}
          );
          res.json({message:"Login successful",bool:true,token});
       }
       else{
          res.json({message:"Invallid credentials",bool:false});
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

const dash=(req,res)=>{
    res.json({message:"Logged in",bool:true});
}
module.exports={loginUser,logoutUser,registerUser,dash};