import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import employeeRouter from './routes/employeeRoutes.js'; 
import connectToDatabase from './db/db.js';


connectToDatabase();


const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRouter); 
app.use('/api/employees', employeeRouter); 


const PORT = process.env.PORT ||3001; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
