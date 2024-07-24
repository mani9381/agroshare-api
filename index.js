const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const userRoutes = require('./routers/userRoutes')


const port = 5000
dotenv.config()
app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))


app.use('/api/v1/users',userRoutes)



app.listen(process.env.PORT || port, () =>{

    console.log(`Example app listening on port ${process.env.PORT}!`)
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Database connected!');
    })
    .catch(()=>{
        console.log("Error while connecting to databse");
    })

})