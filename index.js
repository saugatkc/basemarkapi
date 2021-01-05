const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');

const userRouter = require('./routes/users');
const productRouter = require('./routes/product');
const productCategoryRouter = require('./routes/productCategory');
const cartRouter = require('./routes/cart');
const feedbackRouter = require('./routes/feedback');
const orderRouter = require('./routes/order');


const dotenv = require('dotenv').config();
const cors = require('cors');
const auth = require('./auth');
const uploadRouter = require('./routes/upload');

const app = express();
app.options('*', cors());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({extended: true }));


mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then((db) => {
        console.log("SUCCESSFULLY CONNECTED TO DATABASE SERVER");
    }, (err) => console.log(err));


app.use('/users', userRouter);
app.use('/orders', orderRouter);

app.use('/upload', uploadRouter);
app.use('/products', productRouter);
app.use('/productCategories', productCategoryRouter);
app.use('/cart', cartRouter);
app.use('/feedbacks', feedbackRouter);



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});

app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});