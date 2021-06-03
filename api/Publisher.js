const express = require("express");
const router = express.Router();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const jwt = require('jsonwebtoken');
const Publisher = require('./../models/Publisher');




router.post('/createpublisher',tokenmatch(),(req,res) =>{

  let {publisher}=req.body;
   
  const query = { publisher };

    let {publishername,postbackurl,postbackurlparam,clickidparam,pubidparam,subpubidparam,method,protocol,wastetrafficurl}=req.body;
    
    publishername=publisher.publishername.trim();
    // postbackurl=publisher.postbackurl.trim();
    postbackurlparam=publisher.postbackurlparam.trim();
    clickidparam=publisher.clickidparam.trim();
    method=publisher.method.trim();
   
  
    
    if(publishername== "" || postbackurlparam == "" || clickidparam == "" || method == "" )
    
    {
      res.status(400).json({
        status: "FAILED",
        message: "Empty input fields!"
      });
    }else{
      //checking if user already exist
      Publisher.find({"publishername":publisher.publishername}).then(result =>{
          if(result.length){
              res.status(400).json({
                  status: "FAILED",
                  message: "Publisher with Provided name already Exist.."
              });
          }else{
             
              const newPublisher = new Publisher({
                "publishername":publisher.publishername,
                "postbackurl":publisher.postbackurlparam,
                "postbackurlparam":publisher.postbackurlparam,
                "clickidparam":publisher.clickidparam,
                "pubidparam":publisher.pubidparam,
                "subpubidparam":publisher.subpubidparam,
                "method":publisher.method,
                "protocol":publisher.protocol,
                "status":1,
                "wastetrafficurl":publisher.wastetrafficurl
                });
                      
                newPublisher.save(function(err){
                  if(err){
                    return console.error(err);
                  }else{
                    res.status(200).json({
                      status: "Success",
                      message: "Publisher Create Successful ",
                      data: newPublisher
                 });
                  }
                })
                
            }
          }).catch(err =>{
          console.log(err);
          res.status(400).json({
              status: "FAILED",
              message: "An error occured when saving publisher account!"
          });
      })
  } 

});


router.post('/listPublisher',tokenmatch(),function(req,res) {
  try{
    


  Publisher.find({status:1},{publishername:1, postbackurl:1, postbackurlparam:1, clickidparam:1, pubidparam:1, subpubidparam:1, method:1, protocol:1, status:1, wastetrafficurl:1})
    .then((data)=>{
      if(data){
        
        console.log("Show Record Successfully...")
        res.status(200).json({
          status: "Success",
          message: "User ID & Token is match And Display Publisher List",
          Publishers:data
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


router.post('/editPublisher',tokenmatch(), function(req,res){

  let {publisher}=req.body;
   
  const query = { publisher };

    let {publishername,postbackurl,postbackurlparam,clickidparam,pubidparam,subpubidparam,method,protocol,wastetrafficurl}=req.body;
    
    publishername=publisher.publishername.trim();
    // postbackurl=publisher.postbackurl.trim();
    postbackurlparam=publisher.postbackurlparam.trim();
    clickidparam=publisher.clickidparam.trim();
   
    method=publisher.method.trim();
    status=publisher.status.trim();
        
    if(publishername== "" || postbackurlparam == "" || clickidparam == "" || method == "" )
    
    {
      res.status(400).json({
        status: "FAILED",
        message: "Empty input fields!"
      });
    }else{
  const update = {
  "$set": {
          "_id":publisher._id,
          "publishername": publisher.publishername,
          "postbackurl":publisher.postbackurlparam,
          "postbackurlparam":publisher.postbackurlparam,
          "clickidparam":publisher.clickidparam,
          "pubidparam":publisher.pubidparam,
          "subpubidparam":publisher.subpubidparam,
          "method":publisher.method,
          "protocol":publisher.protocol,
          "wastetrafficurl":publisher.wastetrafficurl
          }
  };
  const options = { "upsert": false }

  Publisher.updateOne({_id:publisher._id}, update, options)
  .then(result => {
    if(result) {
    res.status(200).json({
      status: "Success",
      message: "Publisher Data Successfully Updated..",
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


router.post('/publisherdetails',tokenmatch(),function(req,res){

  let {publisher}=req.body;
     
    const query = { publisher };
  
    const update = {
      "$set": {
              
              "_id":publisher._id
              
              }
      };
      Publisher.find({_id:publisher._id})
              .then((data)=>{
                if(data){
                  
                  console.log("Show Record Successfully...")
                  res.status(200).json({
                    status: "Success",
                    message: "User ID & Token is match And Display Specific Publisher..",
                    Publishers:data
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

router.post('/deletepublisher',tokenmatch(),function(req,res){

  let {publisher}=req.body;
     
  const query = { publisher };

  const update = {
    "$set": {
            
            "_id":publisher._id,
            
            "status":0,
            
            }
    };
   
    const options = { "upsert": false };
    Publisher.updateOne({_id:publisher._id}, update, options)
   
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

router.post('/exportpublisher',tokenmatch(),function(req,res) {
  
  const csvWriter = createCsvWriter({
    path: 'export-publisher.csv',
    header: [
        {id: 'publishername', title: 'PublisherName'},
        {id: 'postbackurl', title: 'PostbackURL'},
        {id: 'postbackurlparam', title: 'PostbackURLparam'},
        {id: 'clickidparam', title: 'Clickidparam'},
        {id: 'pubidparam', title: 'Pubidparam'},
        {id: 'subpubidparam', title: 'Subpubidparam'},
        {id: 'method', title: 'Method'},
        {id: 'protocol', title: 'protocol'},
        {id:'status', title:'Status'}
    ]
});


    Publisher.find({status:1},{publishername:1, postbackurl:1, postbackurlparam:1, clickidparam:1, pubidparam:1, subpubidparam:1, method:1, protocol:1, status:1, wastetrafficurl:1})
    .then((data)=>{
      if(data){
        
        console.log("Show Record Successfully...")
        res.status(200).json({
          status: "Success",
          message: "User ID & Token is match And Display Publisher List",
          Publishers:data
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