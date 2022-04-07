const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({

    name:{
        type:String,
        require:true
    },

    description:{

        type:String,
        require:true
    },
    amount:{
        type:Number,
        require:true
    },

    date:{
        type:Date,
        default: Date.now()
    }

   

})

mongoose.model("Expense",expenseSchema);