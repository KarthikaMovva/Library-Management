const express=require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
// const auth=require('./Auth')

const MembershipRoutes=express.Router();

MembershipRoutes.post('/membership', async (req, res) => {
    try {
      const {member_id,status} = req.body;
      const membership = await prisma.membership.create({
        data: {member_id,status},
      });
      res.status(201).json(membership);
    } catch (error) {
      console.error('Error creating collection:', error);
      res.status(500).json({ error: 'Failed to create collection' });
    }
  });

  module.exports=MembershipRoutes;

