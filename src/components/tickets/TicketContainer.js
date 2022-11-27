import { useState } from "react"
import { TicketSearch } from "../tickets/TicketSearch"
import { TicketList } from "../tickets/TicketList"

export const TicketContainer = () => {

    const [searchTerms, setSearchTerms] = useState("") 

    return <>
            <TicketSearch setterFunction={ setSearchTerms } />
            <TicketList searchTermState={ searchTerms } />
        </>

}

/*
setterFunction & searchTermState are both called props 
this will allow sibling components to share state 
 */