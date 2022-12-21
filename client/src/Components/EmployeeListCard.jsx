import React from 'react'

const EmployeeListCard = ({employee,select}) => {
  return (
    <div className="employeeCard"  onClick={()=>{select(employee)}}>
                          <p>{employee.firstName}</p>
                          <p>{employee.employeeId}</p>
                        </div>
  )
}

export default EmployeeListCard