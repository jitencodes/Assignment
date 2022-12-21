const router = require('express').Router();
const Department = require('../Models/Department');


// GET ALL DEPARTMENTS
router.get('/',async (req,res)=>{
    try {
        const departments = await Department.find();
        res.json(departments);
      } catch (err) {
        res.json(err);
      }
});

//   GET A DEPARTMENTS
router.get("/:id", async (req, res) => {
    try {
      const department = await Department.findById(req.params.id);
      department?res.json(department):res.json('DEPARTMENT NOT EXIST');
    } catch (err) {
      res.json(err);
    }
  });

  // DEPARTMENTS BY CATEGORY
  router.get("/by/category",async (req,res)=>{
    try {
        const departments = await Department.find({category:req.body.category});
        res.json(departments);
      } catch (err) {
        res.json(err);
      }
});


// CREATE NEW DEPARTMENT
router.post('/', async (req,res)=>{
     try{
        // // SEARCHING DEPARTMENT IN DATABASE
            const Exist = await Department.findOne({ departmentName: req.body.departmentName });
            if(Exist){
            res.json('DEPARTMENTS ALREADY EXIST');
            }else{
            // LET'S CREATE NEW department
            const department = new Department({
                departmentName:req.body.departmentName,
                departmentId:req.body.departmentId,
                category:req.body.category,
                location:req.body.location
            });
            const saved = await department.save();
            res.json(saved)            
            }
    }catch(error){
    res.json(error);
    }
            
        
});

// DELETE A DEPARTMENT
router.delete("/:id/", async (req, res) => {
    try {
      const department = await Department.findById(req.params.id);
      await department.deleteOne();
      res.json("THE DEPARTMENT HAS BEEN DLETED" );  
    } catch (err) {
      res.json(err);
    }
  });


// EDIT A DEPARTMENT
router.patch("/:id", async (req, res) => {
  try {
    const updatedDeparment = await Department.updateOne({_id:req.params.id}, {$set: req.body});
    res.json(updatedDeparment);
  } catch (err) {
    return res.json(err);
  }
});

// ADD EMPLOYEE TO DEPARTMENT
// router.patch("/:id", async (req, res) => {
//   try {
//     const updatedDeparment = await Department.updateOne({_id:req.params.id}, {$set: req.body});
//     res.json(updatedDeparment);
//   } catch (err) {
//     return res.json(err);
//   }
// });

// REMOVE EMPLOYEE FROM DEPARTMENT
router.put("/:id/add", async (req, res) => {
  try {
    const updatedUser = await Department.updateOne({_id:req.params.id}, {$set: {employees:req.body}});
    res.json(updatedUser);
  } catch (err) {
    return res.json(err);
  }
  });



module.exports = router;