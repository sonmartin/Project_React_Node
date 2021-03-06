require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')



const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

//Routes
app.use('/user', require('./routes/useRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/paymentRouter'))


// connect to mongodb

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        
}, err => {
    if(err) throw err;
    console.log('Connected to MongoDB')
})




const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log('server is run on port', PORT)
})