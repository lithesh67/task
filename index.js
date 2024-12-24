const express=require('express');
const app=express();
app.use(express.json());
const env=require('dotenv').config();
const port=process.env.port ;


app.use('/login',require('./routes/home'));
app.use('/',require('./routes/home'));


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});       