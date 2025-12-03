import { useContext } from "react"
import UserContext from "../context/UserContext"


export default function Account(){
    const {user}=useContext(UserContext)
    return(
        <div>
            <h2>Account Page</h2>
            <p>Name--{user.name}</p>
            <p>Email--{user.email}</p>
            <p>Role--{user.role}</p>
           
        </div>
    )
}