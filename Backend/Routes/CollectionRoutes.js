const express=require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const CollectionRoutes=express.Router();

CollectionRoutes.post('/collections', async (req, res) => {
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

  module.exports=CollectionRoutes;

