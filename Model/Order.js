const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({

    name:{
        type:String,
        require:true 
    },
    phone:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    doc:{
        type:String,
        require:true
    },
    
    date:{
        type:Date,
        default:Date.now()
    }

})

mongoose.model("Order", orderSchema)