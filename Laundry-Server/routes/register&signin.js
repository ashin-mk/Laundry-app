const express=require("express")
const bcrypt=require("bcrypt")
const router=express.Router()
const jwt=require("jsonwebtoken")

const Users=require('../Modals/register-modal.js')

const salt=10

router.post("/Register",async(req,res)=>{
    //checking email is unique or not
   try {
    const Email= await Users?.find({"Email":req.body.Email})
    if(Email.length){
        res.status(400).send("EmailExist")
     }
    else{
    //checking PhoneNumber is unique or not 
        const Phone=await Users.find({Phone:req.body.Phone})
        if(Phone.length){
            res.status(400).send("PhoneExist")
         }
        else{
    // generating salt        
             bcrypt.genSalt(salt,(salterr,saltval)=>{
             if(!salterr){
    // generating hashvalue
                  bcrypt.hash(req.body.Password,saltval,(hasherr,hasval)=>{
                  if(!hasherr){
                    // creating user
                      Users.create({
                          Name:req.body.Name,
                          Phone:req.body.Phone,
                          Email:req.body.Email,
                          Password:hasval,
                          District:req.body.District,
                          State:req.body.State,
                          Pincode:req.body.Pincode,
                          Address:req.body.Address,
                          })
                          res.status(200).send('successfully created')
                    }
                     else {
                       res.status(400).send("hasherr")
                     }
                  })
                }else
                  {
                  res.status(400).send("salterr")
                  }
            }) // saltclosing 
         }
        }
   } catch (error) {
    console.log('err=-----',error)
    res.status(500).send({error:'ERR'})
   }
    }) // registerclosing


    //Signin

    router.post("/Signin",async(req,res)=>{
      try {
        console.log('signin is calling',req.body)
        let USER=""
      // console.log(isNaN(req.body.User))
      if(isNaN(req.body.User)===false){
        USER="Phone"
      }else{
         USER="Email"
      }
      const signindata= await Users.find({[USER]:req.body.User})
         if(signindata.length){
           const data= await bcrypt.compare(req.body.Password,signindata[0].Password)
             if(data){
              //generating token
                 const Authtoken=jwt.sign(signindata[0].Email,process.env.SECRET_KEY)
                 const username = signindata[0].Name
                 res.status(200).send({Authtoken: Authtoken, username: username})
              }
              else{
                 res.status(400).send("Invalid password")
              }
          }
          else{
            res.status(400).send(`Invalid User`)
          }
      } catch (error) {
        res.status(500).send({message:'error',err:error})
      }
    })

    router.get("/user",(req,res)=>{
      try {
        const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY );
        Users.find({Email : user}).then((data)=>{
          // console.log(data)
          res.status(200).send({user: data});
        }).catch((err)=>{
          res.status(400).send(err);
        })
    } catch(err) {
        res.status(400).send("Unauthorize user", err)
    }  
  
    })

    module.exports=router