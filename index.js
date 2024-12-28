const express=require('express');
const app=express();
const cors = require('cors');
app.use(cors({origin:"http://localhost:4200",credentials:true})); 
app.use(express.json());
const cookieParser=require('cookie-parser');
app.use(cookieParser());
const env=require('dotenv').config();
const port=process.env.port ;

app.use(require('./routes/home'));
                         


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
});       