import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEdit = () => {

    const [ticket, editTicket] = useState({
        description: "",
        emergency: false

    })

    // returns an object
    const { ticketId } = useParams() 

    const navigate = useNavigate()

    useEffect( 
        () => { 
            fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
                .then(response => response.json())
                .then((ticketObject) => { 
                    editTicket(ticketObject)
                })
        }, 
        [ticketId]
    )

    const handleEditButtonClick = (event) => {
        event.preventDefault()


        return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ticket)
        })

            .then((response) => response.json)
            .then(() => {
                navigate("/tickets")
            })
    }


    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Edit Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Edit your ticket..."
                       
                        onChange={
                            (event) => {
                                const copy = { ...ticket }
                                copy.description = event.target.value
                                editTicket(copy)
                            }
                        }></textarea> 
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (event) => {
                                const copy = { ...ticket }
                                copy.emergency = event.target.checked
                                editTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => { handleEditButtonClick(clickEvent) }}
                className="btn btn-primary">
                Save Edits
            </button>
        </form>
    )

}