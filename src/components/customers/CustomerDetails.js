import { useState, useEffect } from "react" 
import { useParams } from "react-router-dom"

export const CustomerDetails = () => { 

    const {customerId} = useParams() 
    const [customer, setCustomer] = useState({})

    useEffect(
        () => { 
            fetch(`http://localhost:8088/customers?_expand=user&_embed=serviceTickets&userId=${customerId}`)
                .then(response => response.json())
                .then((customerData) => { 
                    const singleCustomer = customerData[0]
                    setCustomer(singleCustomer)
                })
        }, 
        [customerId]
    )

    return (
        <section className="customer"> 
            <header className="customer_header">{customer?.user?.fullName}</header>
            <div>Email: {customer?.user?.email}</div>
            <div>Phone Number: {customer.phoneNumber}</div>
            <div>Addres: {customer.address}</div>
            <div></div>
        </section> 
    )

}