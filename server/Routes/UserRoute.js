const router = require('express').Router();
const Employee = require('../Models/User');
const bcryptjs = require("bcryptjs");


// GET ALL EMPLOYEES
router.get('/',async (req,res)=>{
    try {
        const employees = await Employee.find();
        res.send(employees);
      } catch (err) {
        res.json(err);
      }
});

//   GET AN EMPLOYEE
router.get("/:id", async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      employee?res.json(employee):res.json('USER NOT EXIST');
    } catch (err) {
      res.json(err);
    }
  });

  // EMPLOYEES BY DEPARTMENT
  router.get("/by/department",async (req,res)=>{
    try {
        const employees = await Employee.find({departName:req.body.departName});
        res.send(employees);
      } catch (err) {
        res.json(err);
      }
});

// EMPLOYEE BY DEPARTMENT AND LOCATION
router.get("/:id", async (req, res) => {
    try {
      const employee = await Employee.find({"location":req.body.location,"department":req.body.department})
      res.status(200).json(employee);  
    } catch (err) {
      res.status(500).json(err);
    }
  });

// CREATE NEW EMPLOYEE
router.post('/', async (req,res)=>{
    // LET'D BCRYPT THE PASSWORD HERE!
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    
    try{
        // // SEARCHING USER IN DATABASE
            const userExist = await Employee.findOne({ email: req.body.email });
            if(userExist){
            res.json('EMPLOYEE ALREADY EXIST');
            }else{
            // LET'S CREATE NEW EMPLOYEE
            const employee = new Employee({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                password:hashedPassword,
                email:req.body.email,
                location:req.body.location,
                salary:req.body.salary,
                employeeId:req.body.employeeId,
                
            });
            const user = await employee.save();
            const { password, updatedAt, ...other } = user._doc;
            res.json(other)            
            }
    }catch(error){
    res.send(error);
    }
            
        
});

// DELETE AN EMPLOYEE
router.delete("/:id/", async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      await employee.deleteOne();
      res.json("THE EMPLOYEE HAS BEEN DLETED" );  
    } catch (err) {
      res.json(err);
    }
  });


// EDIT A EMPLOYEE
router.patch("/:id", async (req, res) => {
  // LET'D BCRYPT THE PASSWORD HERE!
  // const salt = await bcryptjs.genSalt(10);
  // const hashedPassword = await bcryptjs.hash(req.body.password, salt);
  
    try {
      const updatedUser = await Employee.updateOne({_id:req.params.id}, {$set: {
        fristName:req.body.firstName,
        lastName:req.body.lastName,
        location:req.body.location,
        department:req.body.department,
        employeeId:req.body.employeeId,
        salary:req.body.salary
      }});
      res.json(updatedUser);
    } catch (err) {
      return res.json(err);
    }
});



module.exports = router;