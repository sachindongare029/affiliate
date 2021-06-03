const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publisherSchema = new Schema({

    publishername :{
            type:String,
            required:true,
            unique: true 
    },
    postbackurl :{
            type:String,
            
    },
    postbackurlparam :{
            type:String,
           
    },
    clickidparam :{
            type:String,
            required:true
    },
    pubidparam :{
            type:String,
    },
    subpubidparam :{
            type:String
    },
    method :{
            type:String,
            required:true
    },
    protocol :{
            type:String,
          
    },
    wastetrafficurl :{
            type:String,
          
            
    },
    status : {
        type : String,
     
     },
    

});


const Publisher = mongoose.model('Publisher',publisherSchema);

module.exports= Publisher;