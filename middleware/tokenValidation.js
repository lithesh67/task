const jwt=require('jsonwebtoken');

function validateAndSend(refresh){
    try{
        result=jwt.verify(refresh,process.env.refreshKey);
        const newToken=jwt.sign({user:{username:result.user.username,id:result.user.id}},
            process.env.secretKey,
            {expiresIn:'10m'}
          );
        return newToken;
    }
    catch(err){
        return null;
    }
  
   
}

const validateToken=(req,res,next)=>{
    const token=req.cookies.token;
    const refresh=req.cookies.refresh;
    
    if (token){
        jwt.verify(token,process.env.secretKey,(err,decoded)=>{
            if(err instanceof jwt.TokenExpiredError){
                const newToken=validateAndSend(refresh);
                if(newToken!=null){
                    console.log("new");
                    res.cookie("token",newToken,{httpOnly:true,secure:true});
                    next();
                }
                else{
                    console.log("Invalid refresh");
                    
                    res.json({message:"Refresh token is aslo invalid",bool:false});
                }
            }
            else{
                req.userid=decoded.user.id;
                console.log("User id "+req.userid);
                next();
            }
        });
    }
    else{
        res.json({message:"Token not found",bool:false});
    }
};

module.exports={validateToken};