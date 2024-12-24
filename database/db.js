const mysql=require('mysql');
const env=require('dotenv').config();

const conn=mysql.createConnection({
    host:process.env.hostname,
    user:process.env.username,
    password:process.env.password,
    database:process.env.database,
    port:4406
});

conn.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected to database");
    }
});
  
module.exports=conn;   