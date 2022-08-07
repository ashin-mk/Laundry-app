const express= require("express");
const productModal = require("../Modals/product-modal");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Users = require("../Modals/register-modal")


router.post("/create-order",(req,res)=>{  
    const today = new Date()
    const option  = {
        day: "numeric",
        month: "long",
        year: "numeric"
    }
    const option1 = {
        hour: "numeric",
        minute: "numeric",
        hour12: false
    }
    const day = today.toLocaleDateString("en-Us", option);
    const time = today.toLocaleTimeString("en-Us", option1);
    const date = day + " " + time;   
    try {
        const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY );
        Users.find({Email: user}).then((data)=>{
            
            if (data.length) {
                productModal.create({ 
                    userId : req.body.userId,
                    orderId :req.body.orderId,
                    dateTime : date,
                    storeInfo : req.body.storeInfo,
                   
                    status : req.body.status,
                    userAddress: req.body.userAddress,
                    items : req.body.items,
                    price: req.body.price
                 }).then(()=>{
                    res.status(200).send("added successfully")
                        
                }).catch((err)=>{
                    res.status(400).send(err)
                })
            }
            // console.log(data)
        }).catch ((err)=>{
            console.log(err)
        })
    } catch(err) {
        res.status(400).send("Unauthorize user", err)
    }  
})


module.exports= router;