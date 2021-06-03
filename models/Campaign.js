const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Schema for Campaign
const campSchema = new Schema({

    campaignname : {
        type : String,
        required:true
        
       },
bidrate : {
        type :String,
        required:true
},
previewurl : {
        type:String
        
},
discription : {
        type : String
       

},        

territory : {
   type : String,
   required:true
},
operator : {
    type : String,
    required:true
},
partner:{
    type : String
},
advertiser : {
    type : String,
    required:true
},
campaignurl : {
    type : String,
    required:true
},
campaignurlparam: {
        type: String
},
traffictype: {
    type: String,
    required:true
},
campaigntype: {
    type: String,
    required:true
},
associationtype: {
    type: String,
    required:true
},
linkedcampaigns: {
    type: String,
},
blockedpublishers: {
    type: String
},
blockedbrowsers: {
    type: String
},
blockedos: {
    type: String
},
blockeddevice: {
    type: String
},
status : {
    type : String,
    required:true
 },
blockcallbacks : {
    type : String,
    required:true
 },
 dailycaps: {
    type: Number
},
payout: {
    type: String
},
optimise: {
    type: Number
},
});

const Campaign = mongoose.model('Campaign',campSchema);


module.exports = Campaign;