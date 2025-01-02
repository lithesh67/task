const db=require('../database/db');


module.exports.dash=(req,res)=>{
    res.json({message:"Logged in",bool:true});
}

function getType(mimetype){
    if(mimetype.startsWith('image')){
        return 'image';
    }
    if (mimetype.startsWith('video')){
        return 'video';
    }
    if (mimetype.startsWith('application')){
        return "doc";
    }
    return 'other';
}

module.exports.createCourse=async(req,res)=>{
    console.log(req.files);
    const obj=JSON.parse(req.body.data);
    console.log(obj);
    arr=[obj.userid,obj.course_name,obj.instructor,obj.desc,obj.duration];
    file_arr=[];
    req.files.forEach((file)=>{
        type=getType(file.mimetype);
        if (type=="other"){
            return res.json({message:"Invalid file type",bool:false});
        }
        file.mimetype=type;
    });
    try{
        const result=await db.query('insert into courses(users_id,course_name,instructor,description,duration)values (?)',[arr]);
        const course_id=result[0].insertId;
        req.files.forEach((file)=>{
            file_arr.push([course_id,`/uploads/${file.filename}`,file.filename,file.mimetype]);
        });
        const result1=await db.query('insert into files(courses_id,file_path,file_name,file_type) values ?',[file_arr]);
        res.json({message:"Course created",bool:true});
    }
    catch(err){
        console.log(err);
    } 
}


module.exports.getCourses=async(req,res)=>{
    const userid=(req.params.id);
    try{
        //const result1=await db.query('select * from courses where users_id=?',[userid]);
        const result2=await db.query('select * from courses c inner join files f on c.course_id=f.courses_id where c.users_id=? and f.file_type=?',[userid,'image']);
        res.json({courseList:result2[0]});
     }
    catch(err){
        console.log(err); 
    }
}
 
