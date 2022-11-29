import { useState, useEffect } from "react" 
import { useParams } from "react-router-dom"

export const EmployeeDetails = () => { 

    //capture & extract route parameter employeeId from EmployeeView.js
    const {employeeId} = useParams() 
    const [employee, setEmployee] = useState({}) 

    useEffect(
        () => { 
            fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`) 
                .then(response => response.json())
                .then((employeeData) => { 
                    const singleEmployee = employeeData[0]
                    setEmployee(singleEmployee)
                })
        }, 
        [employeeId]
    )

    return (
    
    <section className="employee">
        <header className="employee__header">{employee?.user?.fullName}</header>
        <div>Email: {employee?.user?.email}</div>
        <div>Speciality: {employee.specialty}</div>
        <div>Rate: {employee.rate}</div>
        <footer>Currently working on {employee?.employeeTickets?.length} tickets.</footer>
    </section>
        
    )
}