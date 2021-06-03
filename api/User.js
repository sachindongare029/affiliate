const express = require("express");
const router = express.Router();

const User1 = require('./../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sgMail = require("@sendgrid/mail");

const API_KEY = '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';

sgMail.setApiKey(API_KEY);

const saltRounds=10;

module.exports = tokenmatch =()=>{
  return (req,res,next)=>{
  let { apitoken, userid } = req.body;
   
    if (apitoken == "" || userid == "") {
      res.status(400).json({
        status: "FAILED",
        message: "Empty data",
      });
      
    }else {
      var verified = jwt.verify(apitoken,'secret');
      console.log("Verified Token:"+JSON.stringify(verified));

     }
     User1.find({userid},{token:1})
     
     .then((data) =>{
       if(data){
       //Compare token
        const dbtoken= data[0].token;

        var buf1 = Buffer.from(dbtoken);
        var buf2 = Buffer.from(apitoken);
        var x = Buffer.compare(buf1, buf2);

          if(x){
            
             console.log("Error");
             res.status(400).json({
              status: "FAILED",
              message: "Invalid userid/token",
            });
            
          }else{
            console.log("Compare Token Successfully...");
            next();
          }
      }else {
        res.status(400).json({
          status: "FAILED",
          message: "Invalid userid/token",
        });
      } 
  }).catch((err) => {
    res.status(400).json({
      status: "FAILED",
      message: "Invalid userid/token",
    });
  });  
}
}

router.post('/createuser',(req,res) =>{
    let {firstname, lastname, userid, email, role, publisher, advertiser}=req.body;
    firstname=firstname.trim();
    lastname=lastname.trim();
    userid=userid.trim();
    email=email.trim();
  
    role=role.trim();
    // publisher=publisher.trim();
    // advertiser=advertiser.trim();
    if(firstname == "" || lastname == "" || userid=="" || email=="" || role == "" )
    {
        res.status(400).json({
            status: "FAILED",
            message: "Empty input fields!"
        });
    
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.status(400).json({
            status: "FAILED",
            message: "Invalid Email Address!"
        });
    }else{
        //checking if user already exist
        User1.find({userid}).then(result =>{
            if(result.length){
                res.status(400).json({
                    status: "FAILED",
                    message: "User with Provided userid already Exist.."
                });
            }else{
                //try to create new user
                //Password Handling
                    const newUser = new User1({
                        firstname,
                        lastname,
                        userid,
                        email,
                        status:1,
                        role,
                        publisher,
                        advertiser
                        });
                        
                    newUser.save()
                        //add send email
                        //console.log(newUser);
                        const message = {
                          to:email,
                         
                          from:{
                              name:"OmkarKadoli",
                              email:"omkarkadoli@gmail.com"
                          },
                          subject:"First Sending message using Sendgrid",
                          text: "Hello from Sendgrid",
                          html:"<h1>Hello Have a Nice Day...!</h1>"
                      }
                      sgMail.send(message).then(Response => console.log("Email Sent Successfully...!"))
                      .catch((error) => console.log(error.message));

                        res.status(200).json({
                            status: "Success",
                            message: "User Create Successful ",
                            data: newUser
                        });
              }
            }).catch(err =>{
            console.log(err);
            res.status(400).json({
                status: "FAILED",
                message: "An error occured when saving user account!"
            });
        })
    }    
    })
    
    //User Login
    router.post('/login',(req, res) => {
  //take userid & password from api

        let { userid, password } = req.body;
      userid = userid.trim();
      password = password.trim();
    //Check if it is null
      if (userid == "" || password == "") {
        res.status(400).json({
          status: "FAILED",
          message: "Empty data",
        });
      } else {
        // Check if user exist
        User1.find({ userid },{password:1})
          .then((data) => {
            if (data) {
              // User exists
              const hashedPassword = data[0].password;
              //compare hashpassword & Normal password
              bcrypt.compare(password, hashedPassword)
                .then((result) => {
                  if (result) {

                    //Create Token
                    const token = jwt.sign(
                    {
                      userid: userid
                    }, 

                    'secret',{
                      expiresIn: "1y"
                    },function(err,token){
                      
                      res.status(200).json({
                        status: "Success",
                        message: "Signin successful",
                        token: token,
                       
                      });
                      //Update Token in database
                      const query = { "userid": userid };
                      const update = {
                      "$set": {
                              "token": token,
                              }
                      };
                      const options = { "upsert": false };
                      User1.updateOne(query, update, options)
                      .then(result => {
                      const { matchedCount, modifiedCount } = result;
                      if(matchedCount && modifiedCount) {
                              console.log(`Successfully updated the item.`)
                            }
                      })
                      .catch(err => console.error(`Failed to update the item: ${err}`))                    
                    }
                    );
                     // Password match
                   } else {
                    res.status(400).json({
                      status: "FAILED",
                      message: "Invalid userid/password",
                    });
                  }
                })
                .catch((err) => {
                  res.status(400).json({
                    status: "FAILED",
                    message: "Invalid userid/password",
                  });
                });
            } else {
              res.status(400).json({
                status: "FAILED",
                message: "Invalid userid/password",
              });
            }
          })
          .catch((err) => {
            res.status(400).json({
              status: "FAILED",
              message: "Invalid userid/password",
            });
          });
      }
    });

    router.post('/logout',tokenmatch(), function(req, res) {

        //Update Token is null
        let {userid} = req.body;
        const query = { "userid": userid };
        const update = {
        "$set": {
                "token": null,
                }
        };
        const options = { "upsert": false };
        User1.updateOne(query, update, options)
        .then(result => {
          if(result) {
          res.status(200).json({
            status: "Success",
            message: "User Successfully Logout..",
          }); 
          }
          else {
            res.status(400).json({
              status: "FAILED",
              message: "Failed Data Updation..!",
            });
          }
        })
        .catch((err) => {
          res.status(400).json({
            status: "FAILED",
            message: "Failed Data Updation..!",
          });
        }); 
    });


    router.post('/userupdate',tokenmatch(), function(req,res){
      //Take token from api
      let {user}=req.body;
      //Update user   
      const query = { user };
      let {firstname, lastname, userid, email, role, publisher, advertiser}=req.body;
  
      firstname=user.firstname.trim();
      lastname=user.lastname.trim();
      userid=user.userid.trim();
      email=user.email.trim();
      role=user.role.trim();

      if(firstname == "" || lastname == "" || userid=="" || email== "" || role == "" )
      {
        res.status(400).json({
          status: "FAILED",
          message: "Empty input fields!"
        });
      }else{
              const update = {
              "$set": {
                      "firstname": user.firstname,
                      "lastname":user.lastname,
                      "userid":user.userid,
                      "email":user.email,
                      "status":user.status,
                      "role":user.role,
                      "publisher":user.publisher,
                      "advertiser":user.advertiser
                      }
              };
              const options = { "upsert": false }
            //  console.log(user)
              User1.updateOne({userid:user.userid}, update, options)
              .then(result => {
                if(result) {
                res.status(200).json({
                  status: "Success",
                  message: "User Data Successfully Updated..",
                }); 
                }
                else {
                  res.status(400).json({
                    status: "FAILED",
                    message: "Failed Data Updation..!",
                  });
                }
              })
              .catch((err) => {
                res.status(400).json({
                  status: "FAILED",
                  message: "Failed Data Updation..!",
                });
              });
            } 
    });
    
  router.post('/delete',tokenmatch(),function(req,res){
    //take userid & token from api

    let {user}=req.body;
              //Update user   
              const query = { user };
            
              const update = {
                "$set": {
                        
                        "userid":user.userid,
                        
                        "status":0,
                        
                        }
                };
                const options = { "upsert": false };
                User1.updateOne({userid:user.userid}, update, options)
                .then(result => {
                if(result) {
                res.status(200).json({
                  status: "Success",
                  message: "User Data Successfully Deleted..",
                }); 
                }
                else {
                  res.status(400).json({
                    status: "FAILED",
                    message: "Failed Data Updation..!",
                  });
                }
              })
              .catch((err) => {
                res.status(400).json({
                  status: "FAILED",
                  message: "Failed Data Updation..!",
                });
              }); 
  })

  router.post('/userList',tokenmatch(),function(req,res) {

    //check userid & token verify
          try{
              let {pageno,records} = req.query;
      
            if(!pageno){
              pageno=1;
            }
            if(!records){
              records=20;
            }
            const limit = parseInt(records);
      
            const offset=(pageno - 1)*records;
      
      
            User1.find({status:1},{firstname:1, lastname:1, userid:1, email:1, status:1, role:1, publisher:1, advertiser:1}).limit(limit).skip(offset)
              .then((data)=>{
                if(data){
                  
                  console.log("Show Record Successfully...")
                  res.status(200).json({
                    status: "Success",
                    message: "User ID & Token is match And Display User List",
                    pageno,
                    records,
                    Users:data
                  });
                }else{
                  res.status(400).json({
            
                    status: "FAILED",
                    message: "Invalid Data"
                    
                  });
                }
              })
      
          }catch(err){
            res.status(400).json({
            
              status: "FAILED",
              message: "Invalid Data",
            });
          }
  });

  router.post('/userdetails',tokenmatch(),function(req,res){
    let {user}=req.body;
     
    const query = { user };
  
    const update = {
      "$set": {
              
              "userid":user.userid
              
              }
      };

      User1.find({userid:user.userid},{password:0,token:0})
              .then((data)=>{
                if(data){
                  
                  console.log("Show Record Successfully...")
                  res.status(200).json({
                    status: "Success",
                    message: "User ID & Token is match And Display Specific User..",
                    Users:data
                  });
                }else{
                  res.status(400).json({
            
                    status: "FAILED",
                    message: "Invalid Data",
                  });
                }
              })
              .catch((err) => {
                res.status(400).json({
                  status: "FAILED",
                  message: "Invalid UserId..!",
                });
              }); 

  });


    module.exports = router;