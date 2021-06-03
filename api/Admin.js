const express = require("express");
const router = express.Router();

//mongodb user model
const User = require('./../models/User');
//const Admin = require("./../models/User");
//password handler
const bcrypt = require('bcrypt');

const saltRounds=10;

router.post('/admin',(req,res) =>{
let {firstname, lastname, userid, email, publisher, advertiser, password}=req.body;

firstname=firstname.trim();
lastname=lastname.trim();
userid=userid.trim();
email=email.trim();

publisher=publisher.trim();
advertiser=advertiser.trim();
password=password.trim();



if(firstname=="" || lastname=="" || userid=="" || email=="" || publisher=="" || advertiser=="" || password=="")
{
    res.status(400).json({
        status: "FAILED",
        message: "Empty input fields!"
    });

}else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
    res.status(400).json({
        status: "FAILED",
        message: "Invalid Email Address!"
    });

}else if(password.length<5){
    res.status(400).json({
        status: "FAILED",
        message: "Password is to short!"
    });
}else{
    //checking if user already exist
    User.find({userid}).then(result =>{
        if(result.length){
            res.status(400).json({
                status: "FAILED",
                message: "User with Provided userid already Exist.."
            });
        }else{
            
            //try to create new user
            //Password Handling
            bcrypt.hash(password, saltRounds).then(hashedPassword => {
                const newUser = new User({
                    firstname,
                    lastname,
                    userid,
                    email,
                    status:'1',
                    role:'admin',
                    publisher,
                    advertiser,
                    password: hashedPassword,

                });
                newUser.save().then(result => {
                    res.status(200).json({
                        status: "Success",
                        message: "Signup Successful ",
                        data: result,
                    });
                })
                .catch(err => {
                    res.status(400).json({
                        status: "FAILED",
                        message: "An error occured when saving user account!"
                    });
                })
            })
            .catch(err => {
                res.status(400).json({
                    status: "FAILED",
                    message: "An error occured when saving user account!"
                });
            })

        }

    }).catch(err =>{
        console.log(err);
        res.status(400).json({
            status: "FAILED",
            message: "An error occured when saving user account!"
        });
    })
}

})



module.exports = router;