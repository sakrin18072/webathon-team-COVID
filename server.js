import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import functionalRoutes from './routes/functionalRoutes.js'
import cropRoute from './routes/cropRoute.js'
import storageRoute from './routes/storageRoute.js'
import cors from 'cors';
const app = express();
connectDB();
dotenv.config();
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/functions',functionalRoutes);
app.use('/api/v1/crop',cropRoute);
app.use('/api/v1/storage',storageRoute);
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to the PORT 8080 </h1>")
})
app.listen(process.env.PORT,()=>{console.log('Server is listening on port 8080')});
