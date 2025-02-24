const express=require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
// const auth=require('./Auth')

const CollectionRoutes=express.Router();

CollectionRoutes.post('/collection',async (req, res) => {
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

  CollectionRoutes.get('/collections',async (req, res) => {
    try {
        const list = await prisma.collection.findMany();
        res.status(200).json(list);
      } catch (error) {
        res.status(500).json({ error: "Internal server error"});
  }
  
});

  module.exports=CollectionRoutes;

