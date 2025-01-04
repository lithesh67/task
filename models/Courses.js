const {Model}=require('objection');

class Courses extends Model{
    static get tableName(){
        return 'courses';
    }

    static get idColumn(){
        return 'course_id';
    }

    static get jsonSchema(){
        return {
            type:'object',
            required:['users_id','course_name','instructor','description','duration'],
            properties:{
                course_id:{type:'integer'},
                users_id:{type:'integer'},
                course_name:{type:'string'},
                instructor:{type:'string'},
                description:{type:'string'},
                duration:{type:'string'},
                published_date:{type:'date'}
            }
        }
    }

    static get relationMappings(){
        const Files=require('./Files');
        const Users=require('./Users');
        return {
           getFiles:{
                relation : Model.HasManyRelation,
                modelClass: Files,
                join : {
                    from: 'courses.course_id',
                    to: 'files.courses_id'
                }
           },
           getCreators:{
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join:{
                    from:'courses.user_id',
                    to:'users.user_id'
                }
           }
        }
    }
}

module.exports=Courses;