const express=require('express');
const App=express();
const cors=require('cors');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const dotenv=require('dotenv');

dotenv.config();

App.use(cors());
App.use(express.json());
const Portnum=process.env.PORT;

App.post('/collections', async (req, res) => {
    try {
      const { collection_name } = req.body;
      const newCollection = await prisma.collection.create({
        data: { collection_name },
      });
      res.status(201).json(newCollection);
    } catch (error) {
      console.error('Error creating collection:', error);
      res.status(500).json({ error: 'Failed to create collection' });
    }
  });


App.listen(Portnum,()=>{
    console.log(`Server is running correctly: ${Portnum}`);
})