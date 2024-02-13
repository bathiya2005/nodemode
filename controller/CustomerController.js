const Customer = require('../model/CustomerSchema');


/*
POST -> save
PUT -> update
GET -> fetch
DELETE -> remove
*/


const saveCustomer = (req,res)=>{
  const tempCustomer = new Customer({
    nic:req.body.nic,
    name:req.body.name,
    address:req.body.address,
    salary:req.body.salary
  });
  tempCustomer.save().then(result=>{
    res.status(201).json({status:true, message:'customer saved!'});
  }).catch(error=>{
    res.status(500).json(error);
  })
};
const findCustomer = (req,res)=>{
    Customer.findOne({nic:req.headers.nic}).then(result=>{
        if(result==null){
          res.status(404).json({status:false, message:'customer not found!'});
        }else{
          res.status(200).json({status:true, data:result});
        }
      }).catch(error=>{
        res.status(500).json(error);
      })

};
const updateCustomer = (req,res)=>{
    Customer.updateOne({nic:req.headers.nic},{
      $set:{
        name:req.body.name,
        address:req.body.address,
        salary:req.body.salary
      }
    }).then(result=>{
      if(result.modifiedCount>0){
        res.status(201).json({status:true, message:'customer was Updated!'});
      }else{
        res.status(200).json({status:false, message:'try again!'});
      }
    }).catch(error=>{
      res.status(500).json(error);
    })

};
const deleteCustomer = (req,res)=>{
    Customer.deleteOne({nic:req.headers.nic}).then(result=>{
        if(result.deletedCount>0){
          res.status(204).json({status:true, message:'customer was Deleted!'});
        }else{
          res.status(400).json({status:false, message:'try again!'});
        }
      }).catch(error=>{
        res.status(500).json(error);
      })

};
const findAllCustomers = (req,res)=>{
    Customer.find().then(result=>{
        res.status(200).json({status:true, data:result});
      }).catch(error=>{
        res.status(500).json(error);
      })

};
module.exports={
    saveCustomer,
    updateCustomer,
    findCustomer,
    deleteCustomer,
    findAllCustomers
  }