const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({

    name:{
        type:String,
        require: true
    },

    phone:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },

    paid:{
        type:Number,
        default:0
    },

    email:{

        type:String,
        require: true
    },
})

mongoose.model("customer",customerSchema)