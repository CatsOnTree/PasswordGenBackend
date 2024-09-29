import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/DBConfig.js'
const app = express()
const PORT = 3000
import cookieParser from 'cookie-parser'


connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'https://passgenmru.netlify.app/', // Ensure this matches your client URL
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  }));
app.use("/user",userRoutes)


app.listen(PORT,()=>{
    console.log(`running on PORT : ${PORT}`);
})



