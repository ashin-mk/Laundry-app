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
        console.log("Server connected succesfully at 3001")
    }
    else{
        console.log(err)
    }
});
const laundryDB= "mongodb://localhost/Laundry"
mongoose.connect(laundryDB,()=>{
    console.log("Successfully connect to db")
},(err)=>{
    console.log(err)
});


app.use("/",register);
app.use("/",productController);
app.use("/", orderController);

app.get("/",(req,res)=>{
    res.status(200).send("Laundry app")
},(err)=>{
    console.log(err)
})

