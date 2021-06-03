const express = require("express");
const router = express.Router();

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const jwt = require('jsonwebtoken');
const Advertiser = require('./../models/Advertiser')


  router.post('/createadvertiser',tokenmatch(),(req,res) =>{

    let {advertiser}=req.body;
    
    const query = { advertiser };
    let { advertisername,clickidparam,otherdetails }=req.body;

        advertisername=advertiser.advertisername.trim();
        clickidparam=advertiser.clickidparam.trim();
        // otherdetails=advertiser.otherdetails.trim();

    if(advertisername== "" || clickidparam== "" )
    {
      res.status(400).json({
        status: "FAILED",
        message: "Empty input fields!"
      });
    }else{
      //checking if user already exist
      Advertiser.find({"advertisername":advertiser.advertisername}).then(result =>{
          if(result.length){
              res.status(400).json({
                  status: "FAILED",
                  message: "Advertiser with Provided name already Exist.."
              });
          }else{
             
              const newAdvertiser = new Advertiser({
                "advertisername":advertiser.advertisername,
                "clickidparam":advertiser.clickidparam,
                "otherdetails":advertiser.otherdetails,
                "status":1,
                });
                      
                newAdvertiser.save(function(err){
                  if(err){
                    return console.error(err);
                  }else{
                    res.status(200).json({
                      status: "Success",
                      message: "Advertiser Create Successful ",
                      data: newAdvertiser
                 });
                  }
                })
            }
          }).catch(err =>{
          console.log(err);
          res.status(400).json({
              status: "FAILED",
              message: "An error occured when saving advertiser account!"
          });
      })
  }

});

router.post('/editAdvertiser',tokenmatch(), function(req,res){

  let {advertiser}=req.body;
    
    const query = { advertiser };
    let { advertisername,clickidparam,otherdetails }=req.body;

        advertisername=advertiser.advertisername.trim();
        clickidparam=advertiser.clickidparam.trim();
        // otherdetails=advertiser.otherdetails.trim();

    if(advertisername== "" || clickidparam== "" )
    {
      res.status(400).json({
        status: "FAILED",
        message: "Empty input fields!"
      });
    }else{
    const update = {
    "$set": {
            "_id":advertiser._id,
            "advertisername": advertiser.advertisername,
            "clickidparam":advertiser.clickidparam,
            "otherdetails":advertiser.otherdetails
            }
    };
    const options = { "upsert": false }
 
    Advertiser.updateOne({_id:advertiser._id}, update, options)
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
  
  router.post('/listAdvertiser',tokenmatch(),function(req,res) {
    try{
      
  
    Advertiser.find({status:1},{advertisername:1, clickidparam:1, otherdetails:1, status:1})
      .then((data)=>{
        if(data){
          
          console.log("Show Record Successfully...")
          res.status(200).json({
            status: "Success",
            message: "User ID & Token is match And Display Advertiser List",
            Advertisers:data
          });
        }else{
          res.status(400).json({
    
            status: "FAILED",
            message: "Invalid Data",
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
  
  router.post('/deleteadvertiser',tokenmatch(),function(req,res){

    let {advertiser}=req.body;
       
    const query = { advertiser };
  
    const update = {
      "$set": {
              
              "_id":advertiser._id,
              
              "status":0,
              
              }
      };
     
      const options = { "upsert": false };
      Advertiser.updateOne({_id:advertiser._id}, update, options)
     
      .then(result => {
      if(result) {
      res.status(200).json({
        status: "Success",
        message: "User Data Successfully Deleted.."
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

  router.get('/advertisernames',function(req,res){

    Advertiser.find({},{_id:0, advertisername:1})
    .then((data)=>{
      if(data){
        
        console.log("Show Record Successfully...")
        res.status(200).json({
          status: "Success",
          message: "Advertiser Name list",
          Advertisers:data.map(v => v.advertisername)
        });
        console.log(data.map(v => v.advertisername));
      }else{
        res.status(400).json({
  
          status: "FAILED",
          message: "Invalid Data",
        });
      }
    })
    
});

router.post('/exportadvertiser',tokenmatch(),function(req,res) {
  
  const csvWriter = createCsvWriter({
    path: 'export-advertiser.csv',
    header: [
        {id: 'advertisername', title: 'AdvertiserName'},
        {id: 'clickidparam', title: 'Clickidparam'},
        {id: 'otherdetails', title: 'OtherDetails'},
        {id: 'status', title: 'Status'}
    ]
    });
Advertiser.find({status:1},{advertisername:1, clickidparam:1, otherdetails:1, status:1})
.then((data)=>{
  if(data){
    
    console.log("Show Record Successfully...")
    res.status(200).json({
      status: "Success",
      message: "User ID & Token is match And Display Advertiser List",
      Advertisers:data
    });

    csvWriter.writeRecords(data)       // returns a promise
        .then(() => {
        console.log('File Download Successfully..');
         });

  }else{
    res.status(400).json({

      status: "FAILED",
      message: "Invalid Data",
    });
  }
})


});

module.exports = router;