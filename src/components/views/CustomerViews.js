import { Outlet, Route, Routes } from "react-router-dom"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"
import { Profile } from "../profile/Profile"
import { TicketEdit } from "../tickets/TicketEdit"


export const CustomerViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <div className="style">
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </div>
            }>

                <Route path="tickets" element={<TicketList />} />
                <Route path="ticket/create" element={<TicketForm />} />
                <Route path="profile" element={<Profile />} />
                <Route path="tickets/:ticketId/edit" element={ <TicketEdit /> } />

            </Route> 
        </Routes>
    )
}
