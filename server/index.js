const express = require('express');
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

/**  cors configuration  */
const corsOptions = {
    origin:"*",
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

app.get('/', (req, res) => {
    return res.status(200).json({msg:"Welcome to Brokers On Board API Server"});
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    }
);
