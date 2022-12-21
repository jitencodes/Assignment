import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const Navigate = useNavigate();
  
  // FUNCTIONS HERE!
  const handleLogout=()=>{
    Navigate('/login')
    localStorage.removeItem("user");
  }
  return (
    <div className='navbar'>
      <div className="navLogoWrapper">
        <i />
        <h2 onClick={()=>{Navigate('/')}} >Dashboard</h2>
      </div>
      <div className="navLogoutWrapper" onClick={handleLogout}>
        <p>Logout</p>
        <i />
      </div>
    </div>
  )
}

export default Navbar