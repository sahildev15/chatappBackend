const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/tasks', require('./routes/routes'));

const PORT = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';
const protocol = process.env.PROTOCOL || 'http';
app.listen(PORT, () => {
  console.log(`Server running at ${protocol}://${host}:${PORT} 🚀`);
});
