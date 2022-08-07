const express = require("express");
const productModal = require("../Modals/product-modal");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/create-order", (req, res)=> {
// console.log(req.headers);
    try {
        const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY );
        productModal.find({userId:user}).then((data)=>{
            res.status(200).send(data)
        }).catch((err)=>{
            res.status(400).send(err);
        })

    } catch(err) {
        // console.log(err)
        res.status(400).send("Unauthorize user")
    }    
   
});


router.delete("/cancel/:id",(req, res)=> {
    productModal.deleteOne({orderId: req.params.id}).then(()=> {
        res.status(200).send("Order Cancelled Sucessfully")
    }).catch((err)=> {
        console.log(err);
        res.status(400).send(err) 
    });
});



module.exports = router;