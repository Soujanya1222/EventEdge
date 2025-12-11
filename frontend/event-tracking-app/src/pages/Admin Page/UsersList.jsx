import { useState,useEffect ,useContext, use} from "react"
import axios from "../../config/axios"
import UserContext from "../../context/UserContext"
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

       const changeRole=async(id,oldRole)=>{
        const newRole=window.prompt("Enter new role (organiser/user):",oldRole)
        if(!newRole) return;
            try{
                const response=await axios.put(`/admin/changeRole/${id}`, { role: newRole },{headers:{Authorization:localStorage.getItem("token")}})
                setUsers(prev=>prev.map(ele=>ele._id ===id? response.data.user:ele))
                alert("User updated successfully.")
            }catch(err){
                console.log(err)
                alert("Failed to update user")
            }
        }
       

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
            <table className="border border-black border-collapse">
                <thead>
                    <tr className="border border-black p-3">
                        <th className="border border-black p-2">Name</th>
                        <th className="border border-black p-2">Email</th>
                        <th className="border border-black p-2">Role</th>
                        {user.role=="admin" && <th className="border border-black p-2">Change Role</th>}
                        {user.role=="admin" && <th className="border border-black p-2">Actions</th>}                    
                    </tr>
                </thead>
                <tbody>
                   
                        {users.map((ele)=>{
                            return(
                                <tr key={ele._id}>
                                    <td className="border border-black p-2">{ele.name}</td>
                                    <td className="border border-black p-2">{ele.email}</td>
                                    <td className="border border-black p-2">{ele.role}</td>
                                    {user.role=="admin" &&<td className="border border-black p-2">{user?.role=="admin"&&<button onClick={()=>changeRole(ele._id,ele.role)}>Edit</button>}</td>}
                                    {user.role=="admin" && <td className="border border-black p-2">{user?.role=="admin" &&<button  onClick={()=>handleRemove(ele._id,ele.email)}>Delete</button>}</td>}

                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </div>
    )
}