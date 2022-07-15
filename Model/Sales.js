const mongoose = require('mongoose')
const Schema = mongoose.Schema

const salseSchema = new Schema({

    name:{
        type:String,
        require:true
    },

    quantity:{

        type:Number,
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    date:{
        type:Date,
        default: Date.now()
    },


    customer:{
        type: Schema.Types.ObjectId,
        ref:'customer'
    }

})

mongoose.model("Sales",salseSchema);