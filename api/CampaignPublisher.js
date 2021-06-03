const express = require("express");
const associationtype = require("../associationtype");
const router = express.Router();

const CampaignPublisher = require('./../models/CampaignPublisher')

router.post('/createcampaignpublisher',tokenmatch(),(req,res) =>{

    let {campaignpublisher}=req.body;
    
    const query = { campaignpublisher };
    let { campaignname,publishername,publisherurl,sharewithpublisher,bidrate,optimization,caps,associationtype }=req.body;

    campaignname=campaignpublisher.campaignname.trim();
    publishername=campaignpublisher.publishername.trim();
    publisherurl=campaignpublisher.publisherurl.trim();
    sharewithpublisher=campaignpublisher.sharewithpublisher.trim();
    bidrate=campaignpublisher.bidrate.trim();
    optimization=campaignpublisher.optimization.trim();
    caps=campaignpublisher.caps.trim();
    associationtype=campaignpublisher.associationtype.trim();
     

    if(campaignname== "" || publishername== "" || publisherurl== "" || sharewithpublisher== "" || bidrate== "" || optimization== "" || caps== "" || associationtype == "")
    {
      res.status(400).json({
        status: "FAILED",
        message: "Empty input fields!"
      });
    }else{
      //checking if user already exist
      CampaignPublisher.find({"publishername":campaignpublisher.publishername,"campaignname":campaignpublisher.campaignname}).then(result =>{
          if(result.length){
             
              const update = {
                "$set": {
                  "campaignname":campaignpublisher.campaignname,
                  "publishername":campaignpublisher.publishername,
                  "publisherurl":campaignpublisher.publisherurl,
                  "sharewithpublisher":campaignpublisher.sharewithpublisher,
                  "bidrate":campaignpublisher.bidrate,
                  "optimization":campaignpublisher.optimization,
                  "caps":campaignpublisher.caps,
                  "associationtype":campaignpublisher.associationtype
                        }
                };
                const options = { "upsert": false }
              //  console.log(user)
              CampaignPublisher.updateOne({"publishername":campaignpublisher.publishername,"campaignname":campaignpublisher.campaignname}, update, options)
                .then(result => {
                  if(result) {
                  res.status(200).json({
                    status: "Success",
                    message: "CampaignPublisher Successfully Updated..",
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

          }else{
             
              const newCampaignPublisher = new CampaignPublisher({
                "campaignname":campaignpublisher.campaignname,
                "publishername":campaignpublisher.publishername,
                "publisherurl":campaignpublisher.publisherurl,
                "sharewithpublisher":campaignpublisher.sharewithpublisher,
                "bidrate":campaignpublisher.bidrate,
                "optimization":campaignpublisher.optimization,
                "caps":campaignpublisher.caps,
                "associationtype":campaignpublisher.associationtype,
                "status":1
                });
                      
                newCampaignPublisher.save(function(err){
                  if(err){
                    return console.error(err);
                  }else{
                    res.status(200).json({
                      status: "Success",
                      message: "CampaignPublisher Create Successful ",
                      data: newCampaignPublisher
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

router.post('/listcampaignpublisher',tokenmatch(),function(req,res) {
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
  
  
    CampaignPublisher.find({status:1},{publishername:1, bidrate:1, optimization:1, caps:1, associationtype:1, status:1}).limit(limit).skip(offset)
      .then((data)=>{
        if(data){
          
          console.log("Show Record Successfully...")
          res.status(200).json({
            status: "Success",
            message: "User ID & Token is match And Display CampaignPublisher List",
            pageno,
            records,
            CampaignPublisher:data
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


  router.post('/editbidrate',tokenmatch(), function(req,res){

    let {campaignpublisher}=req.body;
      
      const query = { campaignpublisher };
      let { campaignname,publishername,bidrate }=req.body;

      campaignname=campaignpublisher.campaignname.trim();
      publishername=campaignpublisher.publishername.trim();
      bidrate=campaignpublisher.bidrate.trim();
   
  
      if(campaignname == "" ||publishername== "" || bidrate== "" )
      {
        res.status(400).json({
          status: "FAILED",
          message: "Empty input fields!"
        });
      }else{
        
          
          CampaignPublisher.find({"publishername":campaignpublisher.publishername,"campaignname":campaignpublisher.campaignname}).then(result =>{
              if(result.length){
                 
                  const update = {
                    "$set": {
                      
                      "bidrate":campaignpublisher.bidrate
                     
                            }
                    };
                    const options = { "upsert": false }
                 
                  CampaignPublisher.updateOne({"publishername":campaignpublisher.publishername,"campaignname":campaignpublisher.campaignname}, update, options)
                    .then(result => {
                      if(result) {
                      res.status(200).json({
                        status: "Success",
                        message: "Bidrate Successfully Updated..",
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
    
              }else{
                res.status(400).json({
                  status: "FAILED",
                  message: "Failed Data Updation..!"
              });
                  
                }
              }).catch(err =>{
              console.log(err);
              res.status(400).json({
                  status: "FAILED",
                  message: "An error occured when Updating CampaignPublisher account!"
              });
          })
      
    
    }
    });
    
  router.post('/editoptimization',tokenmatch(), function(req,res){

    let {campaignpublisher}=req.body;
      
      const query = { campaignpublisher };
      let { campaignname,publishername,optimization }=req.body;

      campaignname=campaignpublisher.campaignname.trim();
      publishername=campaignpublisher.publishername.trim();
      optimization=campaignpublisher.optimization.trim();
   
  
      if(campaignname == "" ||publishername== "" || optimization== "" )
      {
        res.status(400).json({
          status: "FAILED",
          message: "Empty input fields!"
        });
      }else{
        
          
          CampaignPublisher.find({"publishername":campaignpublisher.publishername,"campaignname":campaignpublisher.campaignname}).then(result =>{
              if(result.length){
                 
                  const update = {
                    "$set": {
                      
                      "optimization":campaignpublisher.optimization
                     
                            }
                    };
                    const options = { "upsert": false }
                 
                  CampaignPublisher.updateOne({"publishername":campaignpublisher.publishername,"campaignname":campaignpublisher.campaignname}, update, options)
                    .then(result => {
                      if(result) {
                      res.status(200).json({
                        status: "Success",
                        message: "optimization Successfully Updated..",
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
    
              }else{
                res.status(400).json({
                  status: "FAILED",
                  message: "Failed Data Updation..!"
              });
                  
                }
              }).catch(err =>{
              console.log(err);
              res.status(400).json({
                  status: "FAILED",
                  message: "An error occured when Updating CampaignPublisher account!"
              });
          })
    }
    });

    router.post('/editcaps',tokenmatch(), function(req,res){

      let {campaignpublisher}=req.body;
      
      const query = { campaignpublisher };
      let { campaignname,publishername,caps }=req.body;

      campaignname=campaignpublisher.campaignname.trim();
      publishername=campaignpublisher.publishername.trim();
      caps=campaignpublisher.caps.trim();
   
  
      if(campaignname == "" ||publishername== "" || caps== "" )
      {
        res.status(400).json({
          status: "FAILED",
          message: "Empty input fields!"
        });
      }else{
        
          
          CampaignPublisher.find({"publishername":campaignpublisher.publishername,"campaignname":campaignpublisher.campaignname}).then(result =>{
              if(result.length){
                 
                  const update = {
                    "$set": {
                      
                      "caps":campaignpublisher.caps
                     
                            }
                    };
                    const options = { "upsert": false }
                 
                  CampaignPublisher.updateOne({"publishername":campaignpublisher.publishername,"campaignname":campaignpublisher.campaignname}, update, options)
                    .then(result => {
                      if(result) {
                      res.status(200).json({
                        status: "Success",
                        message: "caps Successfully Updated..",
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
    
              }else{
                res.status(400).json({
                  status: "FAILED",
                  message: "Failed Data Updation..!"
              });
                  
                }
              }).catch(err =>{
              console.log(err);
              res.status(400).json({
                  status: "FAILED",
                  message: "An error occured when Updating CampaignPublisher account!"
              });
          })
    }
        });
module.exports = router;