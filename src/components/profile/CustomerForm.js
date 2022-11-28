import { useEffect, useState } from "react"

export const CustomerForm = () => { 

    const [profile, setProfile] = useState({ 
        address: "", 
        phoneNumber: "", 
        userId: 0
    })

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect( 
        () => { 
            fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
                .then(response => response.json())
                .then((profileData) => {
                    const customerObject = profileData[0]
                    setProfile(customerObject)
                })

        }, 
        []
    )

    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
        fetch(`http://localhost:8088/customers/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Customer profile successfully saved")
            })

    }

    return (
        <>
             <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            
            <form className="profile">
                <h2 className="profile__title">Edit Your Profile</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.address}
                            onChange={
                                (evt) => {
                                    // TODO: Update address property
                                    const copy = { ...profile }
                                    copy.address = evt.target.value
                                    setProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input type="text"
                            className="form-control"
                            value={profile.phoneNumber}
                            onChange={
                                (evt) => {
                                    // TODO: Update phoneNumber property
                                    const copy = { ...profile }
                                    copy.phoneNumber = evt.target.value
                                    setProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => {
                        handleSaveButtonClick(clickEvent)
                    }}
                    className="btn btn-primary">
                    Save Profile
                </button>
            </form>
        </>
    )
    
}