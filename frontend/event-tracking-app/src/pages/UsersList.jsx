import { useSelector } from "react-redux"
export default function UsersList(){
    const {data}=useSelector((state)=>{
        return state.users
    })
    return (
        <div>
            <h2>Users List-{data.length}</h2>
        </div>
    )
}