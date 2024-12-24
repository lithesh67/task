const express=require('express');
const app=express();
app.use(express.json());
const env=require('dotenv').config();
const port=process.env.port ;


app.use('/login',require('./routes/home'));
app.use('/logout',require('./routes/home'));

app.get('/',(req,res)=>{
    res.json({message:"Running"});
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});       