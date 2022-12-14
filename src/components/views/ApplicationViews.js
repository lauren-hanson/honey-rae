
import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"
import "./Views.css"

export const ApplicationViews = () => {

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) { 
        // return EmployeeViews
        return < EmployeeViews /> 
    } else { 
        // return CustomerViews 
        return < CustomerViews /> 

    }
}
