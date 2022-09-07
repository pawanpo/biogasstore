const express = require('express')
const mongoose = require('mongoose')

const Stock = mongoose.model('stock')
const Sales = mongoose.model('Sales')
const Customer = mongoose.model('customer')

const router = express.Router()

const RequireLogin = require('../Middleware/requireLogin')


const nodemailer = require('nodemailer');
const requireLogin = require('../Middleware/requireLogin')

const sendgridTransport = require('nodemailer-sendgrid-transport')
const crypto = require('crypto')
const {SENDGRID_API, EMAIL} = require('../config/keys')
//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
const trnasporter = nodemailer.createTransport(sendgridTransport({

    auth:{
        api_key:SENDGRID_API
    }
}))





router.post('/addCustomer', RequireLogin,(req,res)=>{

    const {name,phone,email,address} = req.body

    const customer = new Customer({

        name,
        phone,
        email,
        address
    }) 

    customer.save()
            .then(customer=>{
                res.send({customer})
            })
            .catch(err=>{
                console.log(err)
            })
})


router.put('/updatePaid',RequireLogin,(req,res)=>{

    const {paid} = req.body

        Customer.findByIdAndUpdate(
            
            { _id: req.body.id},
            { $inc: { paid: +paid}}



            )
            .then(updated=>{
                res.json({message:"updated"})
            })


})


router.get('/getCustomer',RequireLogin,(req,res)=>{

    Customer.find()
            .then(customers=>{
                res.json({customers})
            })
})

router.get('/customer/:id',RequireLogin,(req,res)=>{

    Customer.findById({_id:req.params.id})
            .then(customer=>{

                Sales.find({customer:req.params.id})
                    .populate('customer', '_id name email phone address paid')
                    .exec((err,sales)=>{
                        if(err){
                            return res.status(422).json({error:err})
                        }
                         console.log(customer)
                        res.json({customer,sales})
                    })
            }).catch(err=>{
                return res.status(404).json({error:"Customer not found"})
            })

})







router.post('/search-customer',RequireLogin,(req,res)=>{
    let searchStock = new RegExp("^"+req.body.query);
    Customer.find({
        "$or": [
            { name: { '$regex': searchStock,$options: "i" } },
            { phone: { '$regex': searchStock,$options: "i"} }
        ]    
       
    })
    .then(stock=>{
        res.json({stock})
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router