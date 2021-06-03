const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertiserSchema = new Schema({

    advertisername :{
            type:String,
            required:true,
            unique: true 
    },
    clickidparam :{
            type:String,
    },
    otherdetails :{
            type:String
    },
    
    status : {
        type : String,
     
     },
    

});


const Advertiser = mongoose.model('Advertiser',advertiserSchema);

module.exports= Advertiser;