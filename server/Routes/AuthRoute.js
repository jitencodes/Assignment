const router = require('express').Router();
const Employee = require('../Models/User');
const bcryptjs = require("bcryptjs");


//LOGIN QUERY
router.post("/login", async (req, res) => {
    try {
        // SEARCHING USER IN DATABASE
        const user = await Employee.findOne({ email: req.body.email });
        if(!user){
            res.json('EMPLOYEE NOT FOUND');
        }else{
            // CHECKING PASSWORD
            const validPassword = await bcryptjs.compare(req.body.password, user.password)
            if(!validPassword){
                res.json('INCORRECT PASSWORD')
            }else{
                const { password, updatedAt, ...other } = user._doc;
                // LOGIN AND RESPONSE
                res.json(other)
            }
        }
    } catch (err) {
      res.json(err);
    }
  });

//REGISTRATION QUERY
router.post('/register', async (req,res)=>{
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
                employeeId:req.body.employeeId
            });
            const user = await employee.save();
            const { password, updatedAt, ...other } = user._doc;
            res.json(other)            }
    }catch(error){
    res.json(error);
    }
            
        
});


module.exports = router;