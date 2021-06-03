const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campaignpublisherSchema = new Schema({

    campaignname :{
            type:String,
            required:true
    },
    publishername :{
        type:String,
        required:true
},
publisherurl :{
    type:String,
},
sharewithpublisher :{
    type:String,
},
    bidrate :{
            type:String,
    },
    optimization :{
            type:Number
    },
    
    caps : {
        type : Number,
     
     },
     associationtype:{
         type:String
     },
     status:{
         type:String,
         required:true
     }
    

});


const CampaignPublisher = mongoose.model('CampaignPublisher',campaignpublisherSchema);

module.exports= CampaignPublisher;