import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom';
// Modal styles By MUI
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #f6f6f6',
  boxShadow: 24,
  p: 4,
};

// Main Method
export const Departments = () => {
  const Navigate = useNavigate();
  const nameType = useParams().nametype;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // CONST ARE HERE!

  const [departmentName, setDepartmentName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [location2, setLocation2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [salary, setSalary] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([]);

  // USE EFFECTS ARE HERE!
  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
          
  }, []);


    // FUNCTIONS HERE!
    const randomFixedInteger = (length)=> {
      return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
    } 

    const resetInputs =()=>{
      setCategory(""); 
      setDepartmentName("");
      setLocation("");
      setLocation2("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
    const fetchDepartments = async () => {
      // FETCH DEPARTMENTS QUERY
      try{
          const res = await axios.get(`/departments/`);
          setDepartments(res.data);
        }catch(err){
          console.log(err);
        }
      }; 
      
    const fetchEmployees = async () => {
      // FETCH Employees QUERY
      try{
        const res = await axios.get(`/users/`);
        setEmployees(res.data);
      }catch(err){
        console.log(err);
      }
       
      }; 
    
    const  handleAddDepartment = async (e)=>{
      e.preventDefault();
      let departmentId = randomFixedInteger(6);
      const data = {departmentName,departmentId,category,location};
      
      // VALIDATION
      if(departmentName==''||category==''||location==''){
        window.alert(`All Fields Are Required!`)
      }else{
        // ADD DEPARTMENT QUERY
        try{
          const res = await axios.post(`/departments/`,data);
          console.log(res.data);
          if(typeof(res.data)==="string"){
            window.alert(res.data);
          }else{
            window.alert('ADDED SUCCESSFULLY.');
            setDepartments([...departments,res.data]);
          }
        }catch(error){
          console.log(error);
        }
        handleClose();
        resetInputs();
      }

    }
    
    const  handleAddEmployee = async (e)=>{
      e.preventDefault();
      let employeeId = randomFixedInteger(6);
      const data = {firstName,lastName,email,password,location:location2,employeeId};
      
      // VALIDATION
      if(firstName==''||lastName==''||email==''||password==''||location||salary==''){
        window.alert(`All Fields Are Required!`)
      }else{
        // ADD EMPLOYEE QUERY
        try{
          const res = await axios.post(`/users`,data);
          if(typeof(res.data)==="string"){
            window.alert(res.data);
          }else{
            window.alert('ADDED SUCCESSFULLY.');
            setDepartments([...departments,res.data]);
          }  
        }catch(error){
          console.log(error);
        }
        handleClose();
        resetInputs();        
      }
    }


    return (
      <>
      <Navbar />
      <div className="departments">
        <h2>{`${nameType}s`}</h2>
        <div className="container">
        <div className="deartmentList">
        {
          nameType=="department"?
          departments.map((department)=>(
            <div key={department._id?department._id:department.departmentId} className="departmentCard" onClick={()=>{Navigate(`/dashboard/manage/${nameType}/${department._id}`)}}>
            <p>{department.departmentName}</p>
            <p>{department.category}</p>
            <p>{`Employees: ${department.employees? department.employees.length:"0"}`}</p>
          </div> 
          )):
          employees.map((employee)=>(
            <div key={employee._id?employee._id:Math.random()} className="departmentCard" onClick={()=>{Navigate(`/dashboard/manage/${nameType}/${employee._id}`)}}>
            <p>{employee.firstName}</p>
            <p>{employee.salary}</p>
          </div> 
          ))
        }
        </div>
        </div>
        <button onClick={handleOpen} ><i /> Add {nameType} </button>
        
        
        {/* MODAL HERE! */}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            nameType=="department"?(
        <form className="modal" onSubmit={handleAddDepartment}>
          <h4>ADD {nameType}</h4>
          <h6>Fill the following and click submit.</h6>
              <div className="modalInputs">
                <label htmlFor="name">Department Name</label>
                <input type="text" name="name" value={departmentName} onChange={(e)=>{setDepartmentName(e.target.value)}} />
                
                <label htmlFor="category">Category Name</label>
                <input type="text" id="category" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
                
                <label htmlFor="location">Location</label>
                <input type="text" id="location" value={location} onChange={(e)=>{setLocation(e.target.value)}} />
              </div>
          <button type='submit'  >ADD</button>
        </form>
            ):(
              <form className="modal" onSubmit={handleAddEmployee}>
              <h4>ADD Employee</h4>
              <h6>Fill the following and click submit.</h6>
              <div className="modalInputs">
            <div className="inputRow">
            <div className="inputcell">
            <label htmlFor="FirstName">First Name</label>
              <input type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} />
            </div>
            <div className="inputcell">
            <label htmlFor="LastName">Last Name</label>
              <input type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />
            </div>
            </div>  
              <label htmlFor="location">Location</label>
              <input type="text" value={location2} onChange={(e)=>{setLocation2(e.target.value)}}/>
              <label htmlFor="email">Email</label>
              <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
              <label htmlFor="password">Password</label>
              <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
              <button type='submit' >ADD</button>
            </form>
            )
          }

        </Box>
      </Modal>

      </div>
    </>
  )
}
