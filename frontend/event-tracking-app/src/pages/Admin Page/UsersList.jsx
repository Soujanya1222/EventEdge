import { useState,useEffect ,useContext} from "react"
import axios from "../../config/axios"
import UserContext from "../../context/UserContext"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../../slices/userSlice"
const ITEMS_PER_PAGE=3
export default function UsersList(){
    const navigate=useNavigate()
    const {user}=useContext(UserContext)
    const [users,setUsers]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const startIndex=(currentPage-1)*ITEMS_PER_PAGE
  
    const dispatch=useDispatch()
    const {users:user1}=useSelector((state)=>{
        return state.users
    })

    const currentUser=user1.slice(
        startIndex,
        startIndex+ITEMS_PER_PAGE
    )
    const totalPages=Math.ceil(user1.length/ITEMS_PER_PAGE)
    useEffect(()=>{
        dispatch(fetchUsers())
    
    },[dispatch])



       const changeRole=async(id,oldRole)=>{
        const newRole=window.prompt("Enter new role (organiser/user):",oldRole)
        if(!newRole || newRole === oldRole) return;
            try{
                const response=await axios.put(`/admin/changeRole/${id}`, { role: newRole },{headers:{Authorization:localStorage.getItem("token")}})
                if(newRole!=="attendee"){
                    setUsers(prev=>prev.filter(ele=>ele._id !==id))
                }else{
                    setUsers(prev=>prev.map(ele=>ele._id ===id? response.data.user:ele))
                }
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
            <button onClick={() => navigate("/dashboard")} className="back-btn">
                ← Back to Dashboard
            </button>
            <h2><strong>Users List</strong></h2><br/>
            <table className="border border-black border-collapse w-full mt-4">
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
                   
                {currentUser.map((ele)=>{
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
            {user1.length > ITEMS_PER_PAGE && (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                marginTop: "24px"
            }}>
            
            <button disabled={currentPage === 1}onClick={() => setCurrentPage(currentPage - 1)}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              background: "#0b87c1",
              color: "white",
              cursor: "pointer",
              opacity: currentPage === 1 ? 0.5 : 1
            }}>Prev </button>
            <span style={{ fontWeight: "600", color: "#555" }}> Page {currentPage} of {totalPages} </span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              background: "#0b87c1",
              color: "white",
              cursor: "pointer",
              opacity: currentPage === totalPages ? 0.5 : 1
            }}>Next</button>
        </div>
      )}
    </div>
  );
}

