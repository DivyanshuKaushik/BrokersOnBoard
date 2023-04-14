const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectMongoDB = require('./db');

const app = express();

const PORT = process.env.PORT || 4000;

// parse body 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// parse cookies 
app.use(cookieParser())

// express static for images 
app.use("/uploads",express.static(path.join(__dirname, 'uploads')));

/**  cors configuration  */
const corsOptions = {
    origin:["http://localhost:3000","https://brokers-on-board.vercel.app","https://brokersonboard.com"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    credentials:true,
}
app.use(cors(corsOptions))
/**  cors config end */ 

// load environment variables
require('dotenv').config()

// connect to database 
connectMongoDB();

// routes
app.use('/api/property', require('./routes/property.routes'));
app.use('/api/request', require('./routes/request.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/contact', require('./routes/contact.routes'));

app.get('/', (req, res) => {
    return res.status(200).json({msg:"Welcome to Brokers On Board API Server"});
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    }
);
