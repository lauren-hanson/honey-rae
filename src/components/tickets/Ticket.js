import { Link } from "react-router-dom"


// ticketObject & isStaff are props that have been created in TicketList.js

export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => {

    // Find the assigned employee for the current ticket 
    let assignedEmployee = null

    if (ticketObject.employeeTickets.length > 0) {

        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]

        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }



    // Find the employee profile object for the current user 
    const userEmployee = employees.find(employee => employee.userId === currentUser.id)



    // Function that determines if the current user can close the ticket 
    const canClose = () => {
        if (userEmployee?.id === assignedEmployee?.id && currentUser?.staff && ticketObject?.dateCompleted === "") {
            return <button
                onClick={closeTicket} className="ticket__finish">Finish</button>
        } else {
            return ""
        }
    }



    // Function that updates the ticket with a new date completed 
    const closeTicket = () => {

        const copy = {

            userId: ticketObject.id,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()

        }

        // sending new information directly to the serviceTicket by using the PK 
        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
            .then(getAllTickets)
    }

    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button
                onClick={() => {
                    fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
                        method: "DELETE"
                    })
                    .then(() => { 
                        // this will GET updated API & rerender the page 
                        getAllTickets()
                    })
                }}
                className="ticket__delete"
            >Delete</button>
        } else {
            return ""
        }
    }

    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button
                onClick={
                    () => {
                        fetch(`http://localhost:8088/employeeTickets`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                employeeId: userEmployee.id,
                                serviceTicketId: ticketObject.id
                            })
                        })
                            .then(response => response.json())

                            // this is what will happen after ticket has been claimed & API has been updated 
                            // need to GET the state from API again
                            // this function is created in TicketList.js

                            .then(getAllTickets)
                    }
                }>Claim</button>
        } else {
            return ""
        }
    }

    return (

        // tickets contain link only when customer is signed in
        <section className="ticket" key={`ticket--${ticketObject.id}`}>
            <header>
                {
                    currentUser.staff
                        ? `Ticket ${ticketObject.id}`
                        :
                        <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
                }
            </header>
            <section>{ticketObject.description}</section>
            <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
            <footer>
                {
                    ticketObject.employeeTickets.length
                        ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                        : buttonOrNoButton()
                }
                {
                    canClose()
                }
                {
                    deleteButton()
                }
            </footer>
        </section>
    )

}
