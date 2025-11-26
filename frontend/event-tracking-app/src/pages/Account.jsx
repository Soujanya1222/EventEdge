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
            <h2><b>Account Page</b></h2>
           <p> <b>Name--{data.name}</b></p>
            <p><b>Email -- {data.email}</b></p>
           <p> <b>Role--{data.role}</b></p>
        </div>
    )
}