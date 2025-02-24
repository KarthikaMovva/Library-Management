const express=require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
// const auth=require('./Auth')

const MemberRoutes=express.Router();

MemberRoutes.post('/member', async (req, res) => {
    try {
      const {mem_name,mem_phone,mem_email} = req.body;
      const mem = await prisma.member.create({
        data: {mem_name,mem_phone,mem_email},
      });
      res.status(201).json(mem);
    } catch (error) {
      console.error('Error creating collection:', error);
      res.status(500).json({ error: 'Failed to create collection' });
    }
  });

  MemberRoutes.put('/member/:id', async (req, res) => {
    try {
        const {id}=req.params;  
        const { mem_name,mem_phone,mem_email}=req.body;

        const mem=await prisma.member.update({
            where:{mem_id:parseInt(id)}, 
            data:{mem_name,mem_phone,mem_email}, 
        });

        res.status(200).json(mem);  
    } catch (error) {
        console.error('Error updating member:',error);
        res.status(500).json({error: 'Failed to update member'});
    }
});

MemberRoutes.get('/members', async (req, res) => {
    try {
        const listofmembers = await prisma.member.findMany();
        res.status(200).json(listofmembers);
      } catch (error) {
        res.status(500).json({ error: "Internal server error"});
  }
  
});

  module.exports=MemberRoutes;

