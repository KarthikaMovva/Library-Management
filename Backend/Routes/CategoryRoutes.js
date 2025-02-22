const express=require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const CategoryRoutes=express.Router();

CategoryRoutes.post('/category',async (req,res)=>{
    try{
      const {cat_name,sub_cat_name} = req.body;
      const category=await prisma.category.create({
        data:{cat_name,sub_cat_name},
      });
      res.status(201).json(category);
    } catch(error){
      console.error('Error creating collection:',error);
      res.status(500).json({ error: 'Failed to create collection'});
    }
  });

  module.exports=CategoryRoutes;