const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const port = process.env.PORT || 4000;
const app = express()

// Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
dotenv.config()
//Connect to DB
async function connectDB() {
    try {
        const dbUri = process.env.DB_CONNECT;
        if (!dbUri) {
            throw new Error("DB_CONNECT environment variable is not set");
        }
        await mongoose.connect(dbUri);
        console.log("Connected to DB");
    } catch (err) {
        console.error(err);
    }
}

connectDB();

//Middleware
app.use(express.json())
app.use(cors())

//Route middleware 
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute)

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(port, () => console.log(`Server running on port ${port}`));