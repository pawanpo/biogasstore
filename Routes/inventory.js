const express = require('express')
const mongoose = require('mongoose')

const Stock = mongoose.model('stock')
const Sales = mongoose.model('Sales')
const Customer = mongoose.model('customer')

const router = express.Router()

const RequireLogin = require('../Middleware/requireLogin')



router.post('/addStock', RequireLogin,(req,res)=>{

    const {name,quantity,rate} = req.body

    const stock = new Stock({
        name,
        quantity,
        rate
    })

    stock.save()
        .then(result=>{
            res.send({new:result})
        })
        .catch(err=>{
            console.log(err)
        })
})

router.get('/getStock',RequireLogin,(req,res)=>{

    Stock.find()
          .exec()  
          .then(stocks=>{
              
              res.json({stocks})
          })

})
router.post('/getSingleStock',(req,res)=>{


    Stock.findOne({_id:req.body.id})
        .exec()
          .then(stock=>{
              res.json({stock})
          })

})

router.put('/updateStock',RequireLogin,(req,res)=>{

    const {name,quantity,rate} = req.body

    Stock.findByIdAndUpdate(req.body.id,{$set:{name,
        quantity,
        rate}},{new:true})
    
        .then(stock=>{
        res.json({stock})
    })
    .catch(err=>{
        console.log(err)
    })



})


router.post('/addSales', RequireLogin,(req,res)=>{

    const {name,quantity,amount,customer,id} = req.body

    const sales = new Sales({
        name,
        quantity,
        amount,
        customer
    })

    sales.save()
        .then(sold=>{

        
           Stock.findByIdAndUpdate({_id:id},

            { $inc: { quantity: -quantity}}

            )
            .then(result=>{

                res.send({sold,result})

            })
              
            


        })
        .catch(err=>{
            console.log(err)
        })
})


router.get('/getSales',RequireLogin,(req,res)=>{

        Sales.find()
            .then(sales=>{
                res.json({sales})
            })
})



router.post('/search-stock',RequireLogin,(req,res)=>{
    let searchStock = new RegExp("^"+req.body.query);
    Stock.find({name:{$regex:searchStock,$options: "i"}})
    .then(stock=>{
        res.json({stock})
    }).catch(err=>{
        console.log(err)
    })
})
router.post('/search-sales',RequireLogin,(req,res)=>{
    let searchStock = new RegExp("^"+req.body.query);
    Sales.find({name:{$regex:searchStock,$options: "i"}})
    .then(sale=>{
        res.json({sale})
    }).catch(err=>{
        console.log(err)
    })
})




//Stock Update




module.exports = router