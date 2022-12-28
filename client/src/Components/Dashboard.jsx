import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    // const are here!
    const Navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null,);
    useEffect(() => {
      if(currentUser===null){
        Navigate('/login');
      }
   
    }, [])
    

  return (
    <div className='dashboard'>
        <div className="dashboardContent">
        <h1>{`Welcome ${currentUser?.firstName}!`}</h1>
            {
                currentUser?.isManager ? (
                    <>
                <h2>Your Department Is {currentUser?.department?currentUser?.department:`Not Assigned Yet.`}</h2>
                <h2>Perform Action</h2>
                <button onClick={()=>{Navigate('/dashborad/department')}} >Manage Department</button>
                <button onClick={()=>{Navigate('/dashborad/employee')}} >Manage Employee</button>
                    </>
                ): 
                <h2>{currentUser?.department?`You're Assigned in the ${currentUser?.department} Department`:`You're Not Assigned in Any Department Yet.`}</h2>
            }
        </div>
    </div>
  )
}

export default Dashboard;