const {Model}=require('objection');
const knex=require('knex');
const knexfile=require('./knexfile');
const dbs=knex(knexfile['development']);
// Model.knex(dbs);
dbs.raw('select 1+1 as result').then(()=>{
    console.log("Connected to database");
})
.catch((err)=>{
    console.log(err);
})

module.exports=dbs;