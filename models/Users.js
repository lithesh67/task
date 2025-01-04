const {Model}=require('objection');


class Users extends Model{
    static get tableName(){
        return 'users';
    }

    static get idColumn(){
        return 'id';
    }


    static get jsonSchema(){
        return {
            type:'object',
            required:['username','password','email'], 
            properties:{
                id:{type:'integer'},
                username:{type:'string'},
                password:{type:'string'},
                email:{type:'string'},
                Refresh_token:{type:'string'}
            }
        }
    }
    static get relationMappings(){
        const Courses=require('./Courses');
        return {
            getCourses:{
                relation:Model.HasManyRelation,
                modelName:'Courses',
                join:{
                    from:'users.id',
                    to:'courses.users_id'
                }
            }
        }
    }
}

module.exports=Users;