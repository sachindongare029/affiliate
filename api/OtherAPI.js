const express = require("express");
const router = express.Router();

const country = require('../country');
const operator = require('../operator'); 
const traffictype = require("../traffictype");
const campaigntype = require("../campaigntype");
const associationtype = require("../associationtype");
const partners = require("../partners");

router.get('/countries',function(req,res){

    let countries = operator.map(v => v.countryname);
    console.log(countries);

});

router.get('/operators',function(req,res){

    let {countrynm}=req.query;
    console.log(countrynm);
    let countryname = operator.map(v => v.countryname);
    //  console.log(countryname)
    if(countrynm == countryname)
    {
        res.status(400).json({
          
            status: "FAILED",
            message: "Invalid Data",
          });
        
    }else{
     operators = operator.map(v => v.operator);
        console.log(operators);
    }
});

router.get('/traffictype',function(req,res){

    let traffictyp = traffictype.map(v => v.traffictypename);
    console.log(traffictyp);

});

router.get('/campaigntype',function(req,res){

    let campaigntyp = campaigntype.map(v => v.campaigntypename);
    console.log(campaigntyp);

});

router.get('/associationtype',function(req,res){

    let associationtyp = associationtype.map(v => v.associationtypename);
    console.log(associationtyp);

});

router.get('/partner',function(req,res){

    let partner = partners.map(v => v.partnername);
    console.log(partner);

});

module.exports = router;