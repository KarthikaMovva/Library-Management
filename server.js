
const dotenv=require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path=require('path');

const CollectionRoutes = require('./Routes/CollectionRoutes');
const MemberRoutes = require('./Routes/MemberRoutes');
const CategoryRoutes = require('./Routes/CategoryRoutes');
const BookRoutes = require('./Routes/BookRoutes');
const IssuanceRoute = require('./Routes/IssuanceRoute');
const MembershipRoutes = require('./Routes/MembershipRoutes');
const UserRoutes = require('./Routes/SigninRoutes');

const app = express();


app.use(cors());
app.use(express.json());
app.use("/",CollectionRoutes);
app.use("/",MemberRoutes);
app.use("/",CategoryRoutes);
app.use("/",BookRoutes);
app.use("/",IssuanceRoute);
app.use("/",MembershipRoutes);
app.use("/",UserRoutes)
const Portnum=process.env.PORT;

app.use(express.static(path.join(__dirname, "client", "dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
})


app.listen(Portnum,()=>{
    console.log(`Server is running correctly: ${Portnum}`);
})
module.exports=app;