require('dotenv').config();

const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI,{
//     useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
// })
// .then(() => {
//     console.log("DataBase Connected..");
// })
// .catch((err) => console.log(err));
mongoose.connect("mongodb://localhost:27017/userDB", { useUnifiedTopology: true, useNewUrlParser: true,useCreateIndex:true})
.then( () => console.log("Connection Successfully.."))
.catch((err) => console.log(err));

// var decoded = jwt.verify(token, 'token');
//         console.log(decoded);
