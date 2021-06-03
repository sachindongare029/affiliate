//mongodb
require('./config/db');

const app = require('express')();
const port =process.env.PORT || 8080;

const cors = require("cors");
app.use(cors());

const AdminRouter = require('./api/Admin');
const UserRouter = require('./api/User');
const PublisherRouter = require('./api/Publisher');
const AdvertiserRouter = require('./api/Advertiser');
const CampaignRouter = require('./api/Campaign');
const OtherAPIRoter = require('./api/OtherAPI');
const ViewCampaignRouter = require('./api/ViewCampaign');
const CampaignPublisherRouter = require('./api/CampaignPublisher');

//Accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/',AdminRouter)
app.use('/',UserRouter)
app.use('/',PublisherRouter)
app.use('/',AdvertiserRouter)
app.use('/',CampaignRouter)
app.use('/',OtherAPIRoter)
app.use('/',ViewCampaignRouter)
app.use('/',CampaignPublisherRouter)

app.listen(port, () =>{
    console.log(`Server Running on port ${port}`);
})