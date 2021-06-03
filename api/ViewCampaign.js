const express = require("express");
const router = express.Router();

const Campaign = require('./../models/Campaign');

router.post('/viewcampaign',tokenmatch(),(req,res) =>{

    let {offerdetails}=req.body;
     
    const query = { offerdetails };
  
      let {campaignname,territory,operator,advertiser,traffictype,status}=req.body;
    
    var option = Object.keys(offerdetails);
    // console.log(option);
    var Opt = option[0]
    // console.log(Opt)
    
    // console.log(typeof(Opt));

      switch(Opt)
      {
        case "campaignname":
            
            if(campaignname != "" )
            {
                Campaign.find({"campaignname":offerdetails.campaignname})
                .then((data)=>{
                    if(data){
                        res.status(200).json({
                            status: "Success",
                            message: "User ID & Token is match And Display Campaign name List",
                            Compaignname:data
                        });
                    }else{
                        res.status(400).json({
                
                        status: "FAILED",
                        message: "Invalid Data",
                        });
                    }

                })
            }
            break;
        case "territory":    
                if(territory != "" )
                {
                    Campaign.find({"territory":offerdetails.territory})
                    .then((data)=>{
                        if(data){
                            res.status(200).json({
                                status: "Success",
                                message: "User ID & Token is match And Display territory name List",
                                territory:data
                            });
                        }else{
                            res.status(400).json({
                    
                            status: "FAILED",
                            message: "Invalid Data",
                            });
                        }

                    })
                }
                break;
        case "operator": 
                if(operator != "" )
                {
                    Campaign.find({"operator":offerdetails.operator})
                    .then((data)=>{
                        if(data){
                            res.status(200).json({
                                status: "Success",
                                message: "User ID & Token is match And Display operator name List",
                                operator:data
                            });
                        }else{
                            res.status(400).json({
                    
                            status: "FAILED",
                            message: "Invalid Data",
                            });
                        }

                    })
                }
                break;
        case "advertiser":
                if(advertiser != "" )
                {
                    Campaign.find({"advertiser":offerdetails.advertiser})
                    .then((data)=>{
                        if(data){
                            res.status(200).json({
                                status: "Success",
                                message: "User ID & Token is match And Display advertiser name List",
                                advertiser:data
                            });
                        }else{
                            res.status(400).json({
                    
                            status: "FAILED",
                            message: "Invalid Data",
                            });
                        }

                    })
                }
                break;
        case "traffictype":
                if(traffictype != "" )
                {
                    Campaign.find({"traffictype":offerdetails.traffictype})
                    .then((data)=>{
                        if(data){
                            res.status(200).json({
                                status: "Success",
                                message: "User ID & Token is match And Display traffictype name List",
                                traffictype:data
                            });
                        }else{
                            res.status(400).json({
                    
                            status: "FAILED",
                            message: "Invalid Data",
                            });
                        }

                    })
                }
                break;

        case "status":
                if(status != "" )
                {
                    Campaign.find({"status":offerdetails.status})
                    .then((data)=>{
                        if(data){
                            res.status(200).json({
                            status: "Success",
                            message: "User ID & Token is match And Display status List",
                            status:data
                        });
                }else{
                        res.status(400).json({
                
                        status: "FAILED",
                        message: "Invalid Data",
                        });
                    }

                        })
                }
                 break;

        default :
                res.status(400).json({
                status: "FAILED",
                message: "Invalid Data",
                });
      }
      
      
  });

module.exports = router;