const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const jwt = require('jsonwebtoken');

//Schema for Admin
const userSchema = new Schema({

    firstname : {
        type : String,
        required:true
        
       },
lastname : {
        type :String,
        required:true
},
userid : {
        type:String,
        required:true
        
},
email : {
        type : String,
        required:true,
        lowercase:true,
        unique : [true, "Email id is required"],
       

},        
status : {
   type : String,
   required:true
},
role : {
   type : String,
   required:true
},
publisher : {
    type : String
},
advertiser : {
    type : String
},
password : {
    type : String
},
token: {
        type: String,
}
// userObject: {
//     type:String,
//     userid : String
// }

});

const Admin = mongoose.model('Admin',userSchema);
//const User = mongoose.model('User',user1Schema);

module.exports = Admin;