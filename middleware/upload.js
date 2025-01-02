const multer=require('multer');
const path=require('path');
const storage=multer.diskStorage({
    destination:path.join(__dirname,'../uploads'),
    filename:(req,file,cb)=>{
       cb(null,Date.now()+path.extname(file.originalname));
    }
});
upload_conf=multer({storage});
module.exports.upload=(req,res,next)=>{
    upload_conf.array('files',10)(req,res,(err)=>{
        if(err){
            console.log(err);
        }
        next();
    });
}
