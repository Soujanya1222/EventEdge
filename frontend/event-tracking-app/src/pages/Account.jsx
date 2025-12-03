import { useContext } from "react"
import UserContext from "../context/UserContext"
export default function Account(props){
    const {user}=useContext(UserContext)
    if(!user){
        return <p>Loading...</p> //for pagr reload use this and also the useEffect in auth
    }
    return(
        <div>
            <h2>Account Page</h2>
            <p>Name--{user.name}</p>
            <p>Email--{user.email}</p>
            <p>Role--{user.role}</p>
           
        </div>
    )
}