//dotenv bien moi truong
require('dotenv').config();

//Connect DB
const {contentDB, connectDB} = require('./config/db');

//Goi ham
connectDB();

const express = require('express');
const cors = require('cors');

// Ket noi voi routers
// Import Routes
const authRoute = require('./routes/rest/authRoute');
var restRouter = require('./routes/rest');
const orderRoute = require('./routes/rest/orderRoute');
const accountingRoute = require('./routes/rest/accountingRoute');
const stateAccountingRoute = require('./routes/rest/stateAccountingRoute');
const stateOrderRoute = require('./routes/rest/stateOrderRoute');
const districtRoute = require('./routes/rest/districtRoute');

// Import Error Handler
// Must after Routes
const {errorHandler} = require('./middlewares/errorHandler');

const app = express();

// Cors ket noi frond-end vs back-end
app.use(cors());

// Body Parser
app.use(express.json());

//Mount the route (Ket noi route voi server)
app.use('/api/v1/auth', authRoute);
app.use('/rest/api/v1', restRouter);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/accountings', accountingRoute);
app.use('/api/v1/state-accountings', stateAccountingRoute);
app.use('/api/v1/state-orders', stateOrderRoute);
app.use('/api/v1/districts', districtRoute);

//Dua len web
//Route --> Controller
app.get('/', (req, res, next)=>{
    res.status(200).json({
        status:'success',
        data:{
            post: [{
                content: "Hello World!!!",
                date: '14/06/2021'
            }]
        }
    })
})


//Unhandled Route
// '*' Access into all routes
app.all('*', (req, res, next)=>{
    const err = new Error('The route can not be found');
    err.statusCode = 404;
    next(err);
})

// Must after Routes
app.use(errorHandler);

//Mo port
const port = process.env.APP_PORT;

app.listen(process.env.PORT || port, ()=>{
    console.log(`Server is running on port ${port}`);
})