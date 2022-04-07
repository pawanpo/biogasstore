const mongoose = require('mongoose')

const credit = new mongoose.Schema({


    item:{
        type:String,
        require:true
    },

    price:{

        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },

    amount:{
        type:Number,
        require: true
    },

    creditor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'customer'
    }
})

mongoose.model('credit',credit)