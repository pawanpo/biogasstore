
const express = require('express')
const mongoose = require('mongoose')

const Expenses = mongoose.model('Expense')

const router = express.Router()

const RequireLogin = require('../Middleware/requireLogin')


router.post('/addExpenses',RequireLogin,(req,res)=>{

    const {name,description,amount} = req.body

    const expense = new Expenses({
        name,description,amount
    })

    expense.save()
           .then(expense=>{


           

            
            res.json({expense})

           })

})



router.get('/getExpenses',RequireLogin,(req,res)=>{

    Expenses.find()
            .then(expenses=>{

                var sumExpense


                if(expenses!=null){
                    sumExpense = expenses.map(expenses => expenses.amount).reduce((sum, expenses) => sum + expenses);
                    res.json({expenses, sumExpense})

                }
                else {
                    res.json({expenses, sumExpense})

                }

            })
})


router.post('/search-expense',RequireLogin,(req,res)=>{
    let searchExpense = new RegExp("^"+req.body.query);
    
    Expenses.find({
        "$or": [
            { name: { '$regex': searchExpense } }
        ]    
       
    })
    .then(expense=>{
        res.json({expense})
    }).catch(err=>{
        console.log(err)
    })
})


module.exports = router