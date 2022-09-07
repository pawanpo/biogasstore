const express = require('express')
const mongoose = require('mongoose')

const app = express()
const {MONGOURI} = require("./config/keys");
const PORT = process.env.PORT|| 7000;

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', ()=>{
    console.log("connected to Database ")
})
mongoose.connection.on('error',(err)=>{
    

    console.log("connecting",err)
})

app.use( express.json())
app.use('/pdf',express.static('pdf'));

require('./Model/User')
require('./Model/Stock')
require('./Model/Sales')
require('./Model/Customer')
require('./Model/Credit')
require('./Model/Expenditure')
require('./Model/Order')

app.use(require('./Routes/auth'))
app.use(require('./Routes/inventory'))
app.use(require('./Routes/customer'))
app.use(require('./Routes/credit'))
app.use(require('./Routes/expense'))
app.use(require('./Routes/CustomerCredit'))
app.use(require('./Routes/Orders'))





if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running in port", PORT);
})