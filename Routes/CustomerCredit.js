const express = require('express')
const mongoose = require('mongoose')
const Stock = mongoose.model('stock')
const Sales = mongoose.model('Sales')
const Customer = mongoose.model('customer')
const Credit = mongoose.model('credit')
const Expenses = mongoose.model('Expense')

const RequireLogin = require('../Middleware/requireLogin')


const router = express.Router() 


router.post('/addCredit',RequireLogin, (req,res)=>{

    const {item, price,quantity,creditor,id} = req.body

    


    const amount = price*quantity   
    
    const credit = new Credit({

        item,
        price,
        quantity,
        amount : amount ,
        creditor
    })

    credit.save()
            .then(credit=>{


                Stock.findByIdAndUpdate({_id:id},

                    { $inc: { quantity: -quantity}}
        
                    )
                    .then(result=>{
        
                        console.log("reduced")
        
                    })
                      
                    

                res.json({credit})
            })
            .catch(err=>{
                console.log(err)
            })
})


router.get('/getCredit',RequireLogin,(req,res)=>{

    Credit.find()
          .then(credits=>{

        

            res.json({credits})

          }).catch(err=>{
            console.log(err)
        })  

})


router.get('/creditor/:id',RequireLogin,(req,res)=>{

    Customer.findOne({id:req.params.id})
            .then(customer=>{

                Credit.find({creditor:req.params.id})
                    .populate('creditor', '_id name email phone address')
                    .exec((err,credits)=>{
                        if(err){
                            return res.status(422).json({error:err})
                        }

                        console.log("credits to show")
                        res.json({customer,credits})
                    })
            }).catch(err=>{
                console.log(err)
            })
})


router.delete('/deleteCredit/:id',RequireLogin,(req,res)=>{

    Credit.findOne({_id:req.params.id})
    .exec((err,post)=>{
     if(err || !post){
         return res.status(422).json({error:err})
     }
         post.remove()
         .then(result=>{
             
           const sales = new Sales({
               name:result.item,
               quantity: result.quantity,
               amount: result.amount,
               customer : result.creditor

           })

           sales.save()
                .then(sales=>{
                    console.log("Added to sales")
                    res.json({result,sales})
                })

                    
             
         }).catch(err=>{
             console.log(err)
         })
 
     
 })
  
 
 })


 router.post('/search-credit',RequireLogin,(req,res)=>{
    let searchStock = new RegExp("^"+req.body.query);
    Credit.find({
        "$or": [
            { item: { '$regex': searchStock,$options: "i" } }]    
       
    })
    .then(credit=>{
        res.json({credit})
    }).catch(err=>{
        console.log(err)
    })
})



module.exports = router