const express=require('express');
const App=express();
const cors=require('cors');
const dotenv=require('dotenv');
const CollectionRoutes = require('./Routes/CollectionRoutes');
const MemberRoutes = require('./Routes/MemberRoutes');
const CategoryRoutes = require('./Routes/CategoryRoutes');
const BookRoutes = require('./Routes/BookRoutes');
const IssuanceRoute = require('./Routes/IssuanceRoute');
const MembershipRoutes = require('./Routes/MembershipRoutes');

dotenv.config();

App.use(cors());
App.use(express.json());
App.use("/",CollectionRoutes);
App.use("/",MemberRoutes);
App.use("/",CategoryRoutes);
App.use("/",BookRoutes);
App.use("/",IssuanceRoute);
App.use("/",MembershipRoutes);
const Portnum=process.env.PORT;

App.listen(Portnum,()=>{
    console.log(`Server is running correctly: ${Portnum}`);
})

module.exports=App;