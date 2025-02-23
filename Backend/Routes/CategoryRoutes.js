const express=require('express');
const { PrismaClient } = require('@prisma/client');
// const auth=require('./Auth')
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

  CategoryRoutes.get('/categories', async (req, res) => {
    try {
        const list = await prisma.category.findMany();
        res.status(200).json(list);
      } catch (error) {
        res.status(500).json({ error: "Internal server error"});
  }
  
});

  module.exports=CategoryRoutes;