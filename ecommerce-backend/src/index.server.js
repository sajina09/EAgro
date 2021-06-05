const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors');

//routes
const authRoutes = require ('./routes/auth');
const adminRoutes = require ('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

env.config();
//${process.env.MONGO_DB_USER} ${process.env.MONGO_DB_PASSWORD} ${process.env.MONGO_DB_DATABASE}
//mongodb+srv://root:<password>@cluster0.q8uhi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose
  .connect(
    'mongodb://localhost/ecomm',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Database connected");
  });

app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')));
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`listening at ${process.env.PORT}`);
});