import { Link } from "react-router-dom"

// ticketObject & isStaff are props that have been created in TicketList.js

export const Ticket = ({ ticketObject, isStaff }) => {



    return (

    // tickets contain link only when customer is signed in
        <section className="ticket" key={`ticket--${ticketObject.id}`}>
            <header>
                {
                    isStaff
                    ? `Ticket ${ticketObject.id}` 
                    :
                    <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
                }
            </header>
            <section>{ticketObject.description}</section>
            <footer>Emergency: {ticketObject.emergency ? "🧨" : "No"}</footer>
        </section>
    )

}