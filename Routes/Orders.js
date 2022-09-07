const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const Order = mongoose.model('Order')
const multer = require('multer')
const path = require('path')

const nodemailer = require('nodemailer');
//const requireLogin = require('../Middleware/requireLogin')

const sendgridTransport = require('nodemailer-sendgrid-transport')
const {SENDGRID_API, EMAIL} = require('../config/keys')
const cloudinary = require('cloudinary').v2


cloudinary.config({ 
    cloud_name: 'dvovebrho', 
    api_key: '268422821179534', 
    api_secret: '_B-NM3KSJcPsiuNG_9RSoRCfop4' 
  });

const trnasporter = nodemailer.createTransport(sendgridTransport({

    auth:{
        api_key:SENDGRID_API
    }
}))





  
var Pptstorage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './pdf');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
  });
  
  var upload = multer({ storage : Pptstorage }).array('uploadfile',6);
  
  router.post('/uploadfile',function(req,res){
      upload(req,res,function(err) {
          
          if(err) {
              return res.send("Error uploading file.");
          }



            const attachment = req.files[0].path

          cloudinary.uploader.upload(`./${req.files[0].path}`,
          { public_id: req.files[0].path,
           }, 
          function(error, result) {


            var url = result.secure_url

            console.log(url,attachment)
              
            res.json({url,attachment}); 
        
        });


        //   res.json({
        //       message: req.files
        //   })
      });
  });


router.post('/addOrder',(req,res)=>{

    const {name, phone,email,address,url,attachment} = req.body


    const order = new Order({
        name, phone, email,address, doc:url
    })

    order.save()
            .then(order=>{

              console.log(order)
                trnasporter.sendMail({
                    to: [email,"bhutanbiogas@gmail.com"],
                    from: "bhutanbiogas@gmail.com",
                    subject:"Ordered Successfully",
                    html:`<h2>Thank You for your order, our sales team will get back to you shortly</h2>
                          <h3>Name : ${name}</h3>      
                          <h3>Phone : ${phone}</h3>      
                          <h3>Email : ${email}</h3>      
                              
                    `,
                    attachments:[

                        {

                            path: attachment

                        }
                    ]
                })
                res.json({order})
            })
})



router.get('/allOrders',(req,res)=>{

  Order.find()
       .then(orders=>{
        //console.log(orders)
        res.json({orders})
       }) 

})


module.exports = router