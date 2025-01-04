const db=require('../database/db');
const knex=require('../config/db')

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
    let course={ users_id:obj.userid,
                 course_name:obj.course_name,
                 instructor:obj.instructor,
                 description:obj.desc,
                 duration:obj.duration }
    file_arr=[];
    req.files.forEach((file)=>{
        type=getType(file.mimetype);
        if (type=="other"){
            return res.json({message:"Invalid file type",bool:false});
        }
        file.mimetype=type;
    });

    try{
        //const result=await Courses.query().insert(course,file_arr);
        await knex.transaction(async(trx)=>{
            const result1=await trx('courses').insert(course);
            const courses_id=result1[0];
            req.files.forEach((file)=>{
                file_arr.push({ 
                    courses_id:courses_id,
                    file_path:`http://localhost:5000/uploads/${file.filename}`,
                    file_name:  file.filename,
                    file_type: file.mimetype
                });
            });
            const result2=await trx('files').insert(file_arr);
            res.json({message:"Course created",bool:true});
        })
    }
    catch(err){
        console.log(err);  
    } 
}


module.exports.getCourses=async(req,res)=>{
    const userid=(req.params.id);
    try{ 
        //const result1=await db.query('select * from courses where users_id=?',[userid]);
        //const result2=await db.query('select * from courses c inner join files f on c.course_id=f.courses_id where c.users_id=? and f.file_type=?',[userid,'image']);
        const result2=await knex('courses as c').join('files as f','c.course_id','f.courses_id').where('c.users_id','=',userid).where('f.file_type','=','image').select('*');
        res.json({courseList:result2});
     }
    catch(err){
        console.log(err); 
    }
}
 
