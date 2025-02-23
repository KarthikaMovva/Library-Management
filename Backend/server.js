
const dotenv=require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

const CollectionRoutes = require('./Routes/CollectionRoutes');
const MemberRoutes = require('./Routes/MemberRoutes');
const CategoryRoutes = require('./Routes/CategoryRoutes');
const BookRoutes = require('./Routes/BookRoutes');
const IssuanceRoute = require('./Routes/IssuanceRoute');
const MembershipRoutes = require('./Routes/MembershipRoutes');

const app = express();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);


app.use(cors());
app.use(express.json());
app.use("/",CollectionRoutes);
app.use("/",MemberRoutes);
app.use("/",CategoryRoutes);
app.use("/",BookRoutes);
app.use("/",IssuanceRoute);
app.use("/",MembershipRoutes);
const Portnum=process.env.PORT;

const JWT_SECRET = process.env.JWT_SECRET;

app.listen(Portnum,()=>{
    console.log(`Server is running correctly: ${Portnum}`);
})
module.exports=app;