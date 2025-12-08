import { useState,useEffect ,useContext} from "react"
import axios from "../config/axios"
import UserContext from "../context/UserContext"
export default function UsersList(){
    const {user}=useContext(UserContext)
    const [users,setUsers]=useState([])
    useEffect(()=>{
           axios.get('/admin/users',{headers:{Authorization:localStorage.getItem('token')}})
          .then((response)=>{
            setUsers(response.data)
            console.log(response.data)
          }).catch((err)=>{
            console.log(err)
          })
                    
       },[])

       const handleRemove=async(id,email)=>{
        const userConfirm=window.confirm("Are you sure?")
        if(userConfirm){
            const userPrompt=window.prompt("enter email")
            if(userPrompt==email){
                try{
              const response=await axios.delete(`/admin/removeUser/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
               const newArr=users.filter((ele)=>ele._id!=id)
                setUsers(newArr)
            }
           catch(err){
            console.log(err)
           }
            }else{
                alert("email not match")
            }
            
        }
       }

       if(!user ){
        return <p>Loading...</p>
       }

    return(
        <div>
          
            <h2>Users List</h2>
            <table border={10} style={{textAlign:"center"}}>
                <thead>
                <tr>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Role</th>
                    {user.role=='admin' &&<th>Action</th>}
                </tr>
                </thead>
                <tbody>
                {users.map((ele)=>{
                    return(
                        
                            <tr key={ele._id}>
                            <td>{ele.name}</td>
                            <td>{ele.email}</td>
                            <td>{ele.role}</td>
                           {user.role=='admin' && <td>{user._id!=ele._id &&<button onClick={()=>{
                            handleRemove(ele._id,ele.email)
                }}>Remove</button>}</td>}
                        </tr>
                       
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}