const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/product'));
app.use('/enquiries', require('./routes/enquiry'));
app.use('/admin', require('./routes/admin'));

// DB Connection
mongoose.connect(process.env.MONGO_URI, () =>
  console.log('MongoDB connected')
);

app.listen(5000, () => console.log('Server running on port 5000'));
