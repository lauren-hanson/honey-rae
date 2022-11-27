import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Tickets.css"

export const TicketList = ({ searchTermState }) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, setOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())}
                )
            setFilteredTickets(searchedTickets)
        },
        [ searchTermState ]
    )


    useEffect(
        () => {
            // fetch serviceTickets 
            fetch(`http://localhost:8088/serviceTickets`)
                // convert JSON => js 
                .then(response => response.json())
                // implement setter function to return ticketArray
                .then((ticketArray) => {
                    setTickets(ticketArray)
                })
            //console.log("Initial state of tickets", tickets) // View the initial state of tickets
        },
        [] // When this array is empty, you are observing initial component state
    )


    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => {
                    return ticket.emergency === true
                })
                setFilteredTickets(emergencyTickets)
            } else {
                setFilteredTickets(tickets)
            }
        },
        [emergency]
    )


    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFilteredTickets(tickets)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFilteredTickets(myTickets)
            }
        },
        [tickets]
    )

    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFilteredTickets(openTicketArray)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFilteredTickets(myTickets)
            }
        },

        [openOnly]
    )

    //JSX to render state 
    return <>
        {
            honeyUserObject.staff
                ? <>
                    <button onClick={() => { setEmergency(true) }}>Emergency Only</button>
                    <button onClick={() => { setEmergency(false) }}>Show All </button>
                </> :
                <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => setOpenOnly(true)}>Open Tickets</button>
                    <button onClick={() => setOpenOnly(false)}>All My Tickets</button>
                </>
        }

        <h2>List of Tickets</h2>
        <article className="tickets">
            {filteredTickets.map(
                (ticket) => {
                    return <section className="ticket" key={`ticket--${ticket.id}`}>
                        <header>{ticket.description}</header>
                        <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
                    </section>
                }
            )
            }
        </article>
    </>


}

