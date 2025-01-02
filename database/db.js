const mysql=require('mysql2/promise');
const env=require('dotenv').config();

const conn=mysql.createPool({
    host:process.env.hostname,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database,
    port:4406
});

// conn.connect((err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Connected to database");
//     }
// });
  
module.exports=conn;   