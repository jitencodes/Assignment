import React,{useState,useEffect} from 'react';
import axios from "axios";
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import EmployeeListCard from './EmployeeListCard';


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

  
  const ManageDepartments = () => {
    const Navigate = useNavigate();
    const nameType = useParams().nametype;
    const nameTypeId = useParams().id;
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); 
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    
  // CONST ARE HERE!
  const [nameTypeData, setNameTypeData] = useState(); 
  const [departmentName, setDepartmentName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [location2, setLocation2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState();
  const [salary, setSalary] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState(1); 
  const [employees, setEmployees] = useState([]);
  const [EmployeeToAdd, setEmployeeToAdd] = useState([]);
  const data =[{name:"jitendra", employeeId:"134513",salary:"$30000", location:"Faridabad"},
  {name:"jitendra", employeeId:"1345613",salary:"$30000", location:"Faridabad"},
  {name:"jitendra", employeeId:"1334513",salary:"$30000", location:"Faridabad"},
  {name:"jitendra", employeeId:"1345513",salary:"$30000", location:"Faridabad"},
  {name:"jitendra", employeeId:"1345183",salary:"$30000", location:"Faridabad"},
  {name:"jitendra", employeeId:"1345713",salary:"$30000", location:"Faridabad"},
  {name:"jitendra", employeeId:"1348513",salary:"$30000", location:"Faridabad"},
  {name:"jitendra", employeeId:"1345913",salary:"$30000", location:"Faridabad"},
  {name:"jitendra", employeeId:"1345103",salary:"$30000", location:"Faridabad"},
  {name:"jitendra", employeeId:"1347513",salary:"$30000", location:"Faridabad"},
  {name:"jitendra", employeeId:"1345713",salary:"$30000", location:"Faridabad"},
  {name:"jitendra", employeeId:"1345173",salary:"$30000", location:"Faridabad"},
 ];

 const employeeData = {firstName:"Jitendra",lastName:"saini",employeeId:"14256",gender:"male",department:"IT",email:"ok@mail.com",location:"faridabad",hobbies:"Coding & Reading",isManager:true};
 const departmentData = {departmentName:"Jitendra",departmentId:"14256",category:"IT",location:"faridabad",employees:[{employeeName:"jitendra",employeeId:"87656"}]};

    // USE EFFECTS ARE HERE!
    useEffect(() => {
      fetchNametypeData();
      fetchEmployees();
            
    }, []);
    
    useEffect(() => {    
    
    }, [nameTypeData])
    
  // FUNCTIONS HERE!
  
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
 const fetchNametypeData = async ()=>{
   // FETCH DEPARTMENT BY nameTypeId QUERY
   if(nameType ==="department"){
     try{
       const res = await axios.get(`/departments/${nameTypeId}`);
       setNameTypeData(res.data);
      //  console.log(res.data)
      }catch(err){
        console.log(err);
      }
    }else{
      // FETCH EMPLOYEES BY nameTypeId QUERY
      try{
        const res = await axios.get(`/users/${nameTypeId}`);
        // console.log(res.data);
        setNameTypeData(res.data);
        setEmail(res.data.email)
      }catch(err){
        console.log(err);
      }
      
    }
  
 }

 const fetchEmployees = async () => {
  // FETCH Employees QUERY
  try{
    const res = await axios.get(`/users/`);
    setEmployees(res.data);
    // console.log(res.data)
  }catch(err){
    console.log(err);
  }
   
  }; 

 const  handleEditNameTypeData = async (e)=>{
  e.preventDefault();
  
  // EDIT BY nameTypeId QUERY
  if(nameType ==="department"){
    
      const data = {departmentName,category,location,departmentId:nameTypeData.departmentId,employees:nameTypeData.employees};
      
      // VALIDATION
      if(departmentName==''||category==''||location==''){
        window.alert(`All Fields Are Required!`)
      }else{
        // EDIT DEPARTMENT QUERY
        try{
          await axios.patch(`/departments/${nameTypeId}/`,data);
        }catch(error){
          console.log(error);
        }
        setNameTypeData({...data,nameTypeData });
      }

   }else{
    

    const data = {firstName,lastName,location:location2,salary,department:employeeDepartment,employeeId:nameTypeData.employeeId};
    
    // VALIDATION
    if(firstName==''||lastName==''||location2==''||salary==''){
      window.alert(`All Fields Are Required!`)
    }else{
      // EDIT DEPARTMENT QUERY
      try{
        const res = await axios.patch(`/users/${nameTypeId}/`,data);
        console.log(res);
        window.alert(`${nameType} updated!`);
      }catch(error){
        console.log(error);
      }   
      setNameTypeData({...data,email});    
    }

   }

  handleClose();
  resetInputs();

};


const  handleSelectEmployeeToAdd = async (employee)=>{
  // REMOVE EMPLOYEES TO REMOVE FROM DEPARTMENT QUERY
  if(!EmployeeToAdd.includes(employee)){
    EmployeeToAdd.push(employee);
  }
  console.log(employee._id);
  console.log(EmployeeToAdd);

  
};


const  handleAddEmployeeToDepartment = async ()=>{
  // ADD EMPLOYEES TO ADD TO DEPARTMENT QUERY 
  try{
    if(EmployeeToAdd.length==0){
      window.alert("PLAESE SELECT EMPLOYEE TO ADD.")
    }else{
    let data = [...EmployeeToAdd,...nameTypeData.employees];
      nameTypeData.employees =data;
    const res = await axios.put(`/departments/${nameTypeId}/add`,[...nameTypeData.employees]);
    console.log(data);
    console.log(nameTypeData.employees);
    // nameTypeData.employees = data;
    // window.alert("employee added to department!")
  }
  }catch(error){
    console.log("catched")
    console.log(error);
  }  
  // handleClose2()
  setEmployeeToAdd([]);

};



  return (
    <>
        <Navbar />
        <div className="managedepartment">
            <h2>Manage {nameType}</h2>
            {
              nameType=="department"?
                  <>
                  <div className="details">
                      <h6>Department Name:  {nameTypeData?.departmentName} </h6>
                      <h6>Department Category:  {nameTypeData?.category}</h6>
                      <h6>Department Location:  {nameTypeData?.location}</h6>
                      <h6>Total Employees:  {nameTypeData?.employees?.length}</h6>
                  </div>
                  
                <div className="tableTop">
                  <p>Employee list of IT department</p>
                  <div className="tableEditButtons">
                  <button onClick={handleOpen2}><i /></button>
                </div>
                </div>
                  
                  <div className="table">
                  <div className="row">
                      {["Employee Name", "ID", "Location", "Salary"].map((head) => (
                        <div className='cell'
                        key={head}
                        >
                            {head}
                          </div>
                        ))}
                      </div>

                      <div className="body" >
                      {nameTypeData?.employees?.slice((page - 1) * 5, (page - 1) * 5 + 5)
                      .map((row) => (
                          <div className='row'
                            key={row._id}
                          >
                            <div className="cell">{row.firstName}</div>
                            <div className="cell">{row.employeeId?row.employeeId:"not assigned"}</div>
                            <div className="cell">{row.location}</div>
                            <div className="cell">{row.salary}</div>

                          </div>
                        ))}
                      </div>
                  </div>
                  
                  <div className="pagination">
                  <h3 onClick={()=>{
                    page===1? console.log("This is first page"):
                      setPage(page-1)}}>Prev</h3>
                  <h3 onClick={()=>{
                    page===3? console.log("you reach last page"):
                    setPage(page+1)}}>Next</h3>
                </div>
              </>:
              <>
              <div className="employeedetails">
                <div className="wrapper">
                  <h3>Name:</h3>
                  <div className="name">
                  <h3>{nameTypeData?.firstName}</h3>
                  <h3>{nameTypeData?.lastName}</h3>
                  </div>
                </div>
                <div className="wrapper">
                  <h3>Employee ID:</h3>
              <h3>{nameTypeData?.employeeId?nameTypeData?.employeeId:"Not Assigned"}</h3>
                </div>
                <div className="wrapper">
                  <h3>Location:</h3>
              <h3>{nameTypeData?.location}</h3>
                </div>
                <div className="wrapper">
                  <h3>Department:</h3>
              <h3>{nameTypeData?.department?nameTypeData?.department:"Not Assigned"}</h3>
                </div>
                <div className="wrapper">
                  <h3>Salary:</h3>
              <h3>{nameTypeData?.salary}</h3>
                </div>
                <div className="wrapper">
                  <h3>Email:</h3>
              <h3>{nameTypeData?.email}</h3>
                </div>
              </div>
              </>
            }
          
            <button onClick={handleOpen}><i />  EDIT {nameType}</button>
        {/* MODAL HERE! */}

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="modal">
          <h4>EDIT {nameType}</h4>
          <h6>Fill the following and click submit.</h6>
          
          {
            nameType=="department"?(
              <div className="modalInputs">
            <label htmlFor="name">{nameType} Name</label>
                <input type="text" name="name" value={departmentName} onChange={(e)=>{setDepartmentName(e.target.value)}} />
                
                <label htmlFor="category">Category Name</label>
                <input type="text" id="category" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
                
                <label htmlFor="location">Location</label>
                <input type="text" id="location" value={location} onChange={(e)=>{setLocation(e.target.value)}} />
              </div>
            ):(
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
              <label htmlFor="department">Department</label>
              <input type="text" value={employeeDepartment} onChange={(e)=>{setEmployeeDepartment(e.target.value)}}/>
              <label htmlFor="salary">Salary</label>
              <input type="text" value={salary} onChange={(e)=>{setSalary(e.target.value)}}/>
            </div>
            
            )
          }       

          <button onClick={handleEditNameTypeData} >Sumbit</button>
        </div>
        </Box>
      </Modal>

        <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="modal">
          <h4>ADD Employees</h4>
          <h6>Select the Employees to add in the department.</h6>
          
          <div className="modalInputs">
          {employees?.map((row) => (
                          <EmployeeListCard key={row._id} employee={row} select={handleSelectEmployeeToAdd}  />
                        ))}
          </div>
          <button onClick={handleAddEmployeeToDepartment} >Sumbit</button>
        </div>
        </Box>
      </Modal>

        </div>
    </>
  )
}

export default ManageDepartments