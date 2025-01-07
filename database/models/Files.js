const {Model}=require('objection');

class Files extends Model{
    static get tableName(){
        return 'files';
    }

    static get idColumn(){
        return 'file_id';
    }

    static get jsonSchema(){
        return{
            type:'object',
            required:['file_name','file_path','file_type','courses_id'],
            properties:{
                file_id:{type:'integer'},
                courses_id:{type:'integer'},
                file_name:{type:'string'},
                file_path:{type:'string'},
                file_type:{type:'string'}
            }
        }
    }

    static get relationMappings(){
        const Courses=require('./Courses');
        return{
            getFileCourse:{
                relation:Model.BelongsToOneRelation,
                modelClass:Courses,
                join:{
                    from:'files.courses_id',
                    to:'courses.course_id'
                }
            }
        }
    }
}

module.exports=Files;