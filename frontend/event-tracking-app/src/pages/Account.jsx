import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux"
import { fetchAccount } from "../slices/userSlice";

export default function Account(){
    const dispatch=useDispatch()
    useEffect(()=>{
       dispatch(fetchAccount())
    },[])
    const {data}=useSelector((state)=>{
        return state.users;
    })
    if(!data){
        return <p>Loading....</p>
    }
    return(
        <div>
            <h2>Account Page</h2>
           <p> Name--{data.name}</p>
            <p>Email -- {data.email}</p>
           <p> Role--{data.role}</p>
        </div>
    )
}