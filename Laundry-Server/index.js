const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();
require("dotenv").config();
const productController = require("./routes/product");
const orderController = require("./routes/order")
const register = require("./routes/register&signin")
//console.log(productController)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(process.env.PORT || 3001,(err)=>{
    if(!err){
        console.log("Server is running")
    }
    else{
        console.log(err)
    }
});
const laundryDB=`${process.env.DB}`
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
mongoose.connect(`${process.env.DB}`,(e)=>{
    console.log("Successfully connect to db",process.env.DB,e)
},(err)=>{
    console.log(err)
});

app.get('/',(req,res)=>{
    res.status(200).send({message:'success'})
})
app.use("/",register);
app.use("/",productController);
app.use("/", orderController);

app.get("/",(req,res)=>{
    res.status(200).send("Laundry app")
},(err)=>{
    console.log(err)
})

