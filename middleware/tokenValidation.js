const jwt=require('jsonwebtoken');

const validateToken=(req,res,next)=>{
    let authHeader=req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')){
        let token=authHeader.split(' ')[1];
        jwt.verify(token,process.env.secretKey,(err,decoded)=>{
            if(err){
                res.json({message:"Invalid token"});
            }
            else{
                req.user=decoded.user.id;
                console.log("User id"+req.user);
                console.log(decoded);
                next();
            }
        });
    }
    else{
        res.json({message:"Token not found"});
    }
};

module.exports={validateToken};