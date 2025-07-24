import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import userRoutes from './routes/userRoutes'; // Use .ts extension for ts-node
config();

const app = express();
app.use(json());

connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';
const protocol = process.env.PROTOCOL || 'http';
app.listen(PORT, () => {
  console.log(`Server running at ${protocol}://${host}:${PORT} 🚀`);
});
