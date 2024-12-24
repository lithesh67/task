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
                console.log(decoded);
                next();
            }
        });
    }
};

module.exports={validateToken};