const express = require('express')
const mongoose = require('mongoose')

const User = mongoose.model('user')
const router = express.Router()

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const{JWT_SECRET} = require("../config/keys")


router.post('/signup',(req,res)=>{
    const {name, email, password} = req.body

    if(!name || !email || !password){
    return res.status(422).json({error:"add all the fields"})
    }
    User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(422).json({error:"email already exists"})
            }

            bcrypt.hash(password, 12)
            .then(hashedpassword=>{

                const user = new User({
                    email,
                    password : hashedpassword,
                    name, 
                    
                    
                })
                user.save()
                    .then(user=>{
                       
                        res.json({message: "Added successfully"})
                    })
                    .catch( err=>{
                        console.log(err)
                    })
            })        
        })
        .catch(err=>{
            console.log(err);
        })
})


router.post('/signin', (req,res)=>{
    const {email, password} = req.body

    if(!email || !password){

        return res.status(422).json({error:"Please add email or password"})
    }

    User.findOne({email:email})
        .then(savedUser =>{

            if(!savedUser){
                return res.status(422).json({error:"Invalid email or password"})
            }

            bcrypt.compare(password, savedUser.password)
                    .then(doMatch=>{

                        if(doMatch){


                            const token = jwt.sign({_id : savedUser._id}, JWT_SECRET)

                            const {_id,name,email}= savedUser
                            res.json({token, user:{_id,name,email}})


                        }else{

                            return res.status(422).json({error:"email or password dosent match"})
                        }

                    })
                    .catch(err=>{
                        console.log(err)
                    })


        })
})





module.exports = router




// const express = require('express')
// const mongoose = require('mongoose')

// const User = mongoose.model('user')
// const router = express.Router()

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");


// router.post('/signup', async(req,res)=>{


//     try{

//         const {name, password, email} = req.body

//         const user = new User({
//             name,
//             password,
//             email
//         })
//         const reg = await user.save()

//         console.log(reg)

//         res.json(reg)


//     }
//     catch(err){
//         console.log(err)
//     }


// })





// module.exports = router