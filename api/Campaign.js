const express = require("express");
const router = express.Router();

const Campaign = require('./../models/Campaign');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

router.post('/createcampaign',tokenmatch(),(req,res) =>{

    let {campaign}=req.body;
     
    const query = { campaign };
  
      let {campaignname,bidrate,previewurl,discription,territory,operator,partner,advertiser,campaignurl,campaignurlparam,traffictype,campaigntype,associationtype,linkedcampaigns,blockedpublishers,blockedbrowsers,blockedos,blockeddevice,blockcallbacks,dailycaps,payout,optimise}=req.body;
      
      campaignname=campaign.campaignname.trim();
      bidrate=campaign.bidrate.trim();
      territory=campaign.territory.trim();
      operator=campaign.operator.trim();
      advertiser=campaign.advertiser.trim();
      campaignurl=campaign.campaignurl.trim();
      campaignurlparam=campaign.campaignurlparam.trim();
      traffictype=campaign.traffictype.trim();
      campaigntype=campaign.campaigntype.trim();
      associationtype=campaign.associationtype.trim();
     
      
      if(campaignname== "" || bidrate == "" || territory == "" || operator == "" || advertiser == ""|| campaignurlparam == ""|| traffictype == ""|| campaigntype == ""|| associationtype == "")
      
      {
        res.status(400).json({
          status: "FAILED",
          message: "Empty input fields!"
        });
      }else{
        //checking if user already exist
        Campaign.find({"campaignname":campaign.campaignname}).then(result =>{
            if(result.length){
                res.status(400).json({
                    status: "FAILED",
                    message: "Campaign with Provided name already Exist.."
                });
            }else{
               
                const newCampaign = new Campaign({
                  "campaignname":campaign.campaignname,
                  "bidrate":campaign.bidrate,
                  "previewurl":campaign.previewurl,
                  "discription":campaign.discription,
                  "territory":campaign.territory,
                  "operator":campaign.operator,
                  "partner":campaign.partner,
                  "advertiser":campaign.advertiser,
                  "campaignurl":campaign.campaignurlparam,
                  "campaignurlparam":campaign.campaignurlparam,
                  "traffictype":campaign.traffictype,
                  "campaigntype":campaign.campaigntype,
                  "associationtype":campaign.associationtype,
                  "linkedcampaigns":campaign.linkedcampaigns,
                  "blockedpublishers":campaign.blockedpublishers,
                  "blockedbrowsers":campaign.blockedbrowsers,
                  "blockedos":campaign.blockedos,
                  "blockeddevice":campaign.blockeddevice,
                  "status":1,
                  "blockcallbacks":0,                  
                  "dailycaps":campaign.dailycaps,
                  "payout":campaign.payout,
                  "optimise":campaign.optimise
                  });
                        
                  newCampaign.save(function(err){
                    if(err){
                      return console.error(err);
                    }else{
                      res.status(200).json({
                        status: "Success",
                        message: "Publisher Create Successful ",
                        data: newCampaign
                   });
                    }
                  })
              }
            }).catch(err =>{
            console.log(err);
            res.status(400).json({
                status: "FAILED",
                message: "An error occured when saving user account!"
            });
        })
    } 
      
  });

  router.post('/listcampaign',tokenmatch(),function(req,res) {
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
  
  
    Campaign.find({status:1},{campaignname:1, bidrate:1, previewurl:1, discription:1, territory:1, operator:1, advertiser:1, campaignurl:1, campaignurlparam:1, traffictype:1, campaigntype:1, associationtype:1, dailycaps:1, status:1, }).limit(limit).skip(offset)
      .then((data)=>{
        if(data){
          
          console.log("Show Record Successfully...")
          res.status(200).json({
            status: "Success",
            message: "User ID & Token is match And Display Campaign List",
            pageno,
            records,
            Compaign:data
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

  router.post('/editcampaign',tokenmatch(), function(req,res){

    let {campaign} = req.body;
     
    const query = { campaign };
  
    let {campaignname,bidrate,previewurl,discription,territory,operator,partner,advertiser,campaignurl,campaignurlparam,traffictype,campaigntype,associationtype,linkedcampaigns,blockedpublishers,blockedbrowsers,blockedos,blockeddevice,blockcallbacks,dailycaps,payout,optimise}=req.body;
      
      campaignname=campaign.campaignname.trim();
      bidrate=campaign.bidrate.trim();
      territory=campaign.territory.trim();
      operator=campaign.operator.trim();
      advertiser=campaign.advertiser.trim();
      campaignurl=campaign.campaignurl.trim();
      campaignurlparam=campaign.campaignurlparam.trim();
      traffictype=campaign.traffictype.trim();
      campaigntype=campaign.campaigntype.trim();
      associationtype=campaign.associationtype.trim();
      
     
      
      if(campaignname== "" || bidrate == "" || territory == "" || operator == "" || advertiser == ""|| campaignurlparam == ""|| traffictype == ""|| campaigntype == ""|| associationtype == "")
      
      {
        res.status(400).json({
          status: "FAILED",
          message: "Empty input fields!"
        });
      }else{
    const update = {
    "$set": {
            "_id":campaign._id,
            "campaignname":campaign.campaignname,
            "bidrate":campaign.bidrate,
            "previewurl":campaign.previewurl,
            "discription":campaign.discription,
            "territory":campaign.territory,
            "operator":campaign.operator,
            "partner":campaign.partner,
            "advertiser":campaign.advertiser,
            "campaignurl":campaign.campaignurlparam,
            "campaignurlparam":campaign.campaignurlparam,
            "traffictype":campaign.traffictype,
            "campaigntype":campaign.campaigntype,
            "associationtype":campaign.associationtype,
            "linkedcampaigns":campaign.linkedcampaigns,
            "blockedpublishers":campaign.blockedpublishers,
            "blockedbrowsers":campaign.blockedbrowsers,
            "blockedos":campaign.blockedos,
            "blockeddevice":campaign.blockeddevice,
            "status":1,
            "blockcallbacks":0,                  
            "dailycaps":campaign.dailycaps,
            "payout":campaign.payout,
            "optimise":campaign.optimise
            }
    };
    const options = { "upsert": false }
  //  console.log(user);
    Campaign.updateOne({_id:campaign._id}, update, options)
    .then(result => {
      if(result) {
      res.status(200).json({
        status: "Success",
        message: "Campaign Data Successfully Updated..",
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

  router.post('/deletecampaign',tokenmatch(),function(req,res){

    let {campaign}=req.body;
       
    const query = { campaign };
  
    const update = {
      "$set": {
              
              "_id":campaign._id,
              
              "status":0,
              
              }
      };
     
      const options = { "upsert": false };
      Campaign.updateOne({_id:campaign._id}, update, options)
     
      .then(result => {
      if(result) {
      res.status(200).json({
        status: "Success",
        message: "Campaign Data Successfully Deleted.."
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

  router.post('/exportcampaign',tokenmatch(),function(req,res) {
  
    const csvWriter = createCsvWriter({
      path: 'export-campaign.csv',
      header: [
          {id: 'campaignname', title: 'CampaignName'},
          {id: 'bidrate', title: 'Bidrate'},
          {id: 'previewurl', title: 'PreviewURL'},
          {id: 'discription', title: 'Discription'},
          {id: 'territory', title: 'Territory'},
          {id: 'operator', title: 'Operator'},
          {id: 'advertiser', title: 'Advertiser'},
          {id: 'campaignurl', title: 'CampaignURL'},
          {id:'campaignurlparam', title:'Campaignurlparam'},
          {id: 'traffictype', title: 'TrafficType'},
          {id:'campaigntype', title:'CampaignType'},
          {id: 'associationtype', title: 'AssociationType'},
          {id:'dailycaps', title:'DailyCaps'},
          {id: 'status', title: 'Status'}
      ]
  });
  
  
  Campaign.find({status:1},{campaignname:1, bidrate:1, previewurl:1, discription:1, territory:1, operator:1, advertiser:1, campaignurl:1, campaignurlparam:1, traffictype:1, campaigntype:1, associationtype:1, dailycaps:1, status:1, })
  .then((data)=>{
    if(data){
      
      console.log("Show Record Successfully...")
      res.status(200).json({
        status: "Success",
        message: "User ID & Token is match And Display Campaign List",
        Compaign:data
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