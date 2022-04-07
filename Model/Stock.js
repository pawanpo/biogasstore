const mongoose = require('mongoose')

const stock = new mongoose.Schema({

    name:{
        type : String,
        require:true
    },
    quantity:{
        type: Number,
        require:true
    },
    rate:{
        type: Number,
        require:true
    }

})

mongoose.model("stock",stock)