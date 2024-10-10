const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const url = process.env.DATABASE_URI;
mongoose.connect(url)
.then(()=>{
console.log("Database connected successfully...");
})
.catch((e)=>{
    console.log("something went wrong while connecting with Database!");
    console.log(e);
});
