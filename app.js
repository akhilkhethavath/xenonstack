const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
// const aiRoutes = require('./routes/aiRoutes');
const{ authMiddleware } = require('./middlewares/authMiddleware')
const { errorMiddleware } = require('./middlewares/errorMiddleware');


dotenv.config();

const app = express();
app.use(cors({
    origin: 'https://xenon-frontend-omega.vercel.app/',
    methods: 'GET,POST,PUT,DELETE',
    credentials:true,
}));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send("helloworld");
})
app.use('/auth', authRoutes);

//app.use(authMiddleware);
app.use('/properties', propertyRoutes);
app.use('/user', userRoutes);
// app.use('/ai', aiRoutes);
app.use(errorMiddleware);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
