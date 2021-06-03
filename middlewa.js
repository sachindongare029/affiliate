const app = require("express")();

const jwt = require('jsonwebtoken');


const tokenmatch =()=>{
    return (req,res,next)=>{
    let { apitoken, userid } = req.body;
     
      if (apitoken == "" || userid == "") {
        res.json({
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
              
               console.log("Error")
              
            }else{
              console.log("Compare Token Successfully...")
       next();
            }
        } 
    });  
}
}