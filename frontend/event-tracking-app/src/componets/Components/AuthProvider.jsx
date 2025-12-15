import { useEffect, useReducer } from "react"
import UserContext from "../../context/UserContext"
import axios from "../../config/axios"
import { useNavigate } from "react-router-dom"

const userReducer=(state,action)=>{
    switch(action.type){
        case "LOGIN":{
            return {...state,isLoggedIn:true,user:action.payload,adminExists: action.payload.role === "admin" ? true : state.adminExists,serverErrors:''}
        }
        case "LOGOUT":{
            return {...state,isLoggedIn:false,user:null}
        }
        case "SERVER_ERROR":{
            return {...state,serverErrors:action.payload}
        }
        case "UPDATE_USER":{
            return {...state,user:action.payload}
        }
        case "ADMIN_EXISTS":{
            return {...state,serverErrors:'',adminExists:true}
        }
        default:{
            return {...state}
        }
    }
}

export default function AuthProvider(props){
    const navigate=useNavigate()
    const [userState,userDispatch]=useReducer(userReducer,{
        user:null,
        isLoggedIn:false,
        serverErrors:'',
        adminExists: false,
    })

    useEffect(()=>{
        if(localStorage.getItem("token")){
            const fetchUser=async()=>{
                try{
                    const response=await axios.get('/user/account',{headers:{Authorization:localStorage.getItem("token")}})
                    userDispatch({type:"LOGIN",payload:response.data})
                }catch(err){
                    alert(err.message)
                }
            }
            fetchUser();
            adminExists();
            
        }
    },[])


    const handleRegister=async(formData,resetForm)=>{
        try{
            const response=await axios.post('/users/register',formData)
            console.log("response:",response.data);
            alert("Successfully Registered")
            resetForm();
            userDispatch({type:"SERVER_ERROR",payload:""})
            navigate('/login')
        }catch(err){
            console.log(err.message)
            userDispatch({type:'SERVER_ERROR',payload:err.response.data.error})
        }
    }


    const handleLogin=async(formData,resetForm)=>{
        try{
            const response=await axios.post('/user/login',formData)
            console.log("response",response.data);
            localStorage.setItem('token',response.data.token)
            const userResponse=await axios.get('/user/account',{headers:{Authorization:localStorage.getItem("token")}})
            console.log(userResponse)
            userDispatch({type:"LOGIN" ,payload:userResponse.data})
            alert("Successfully Logged In")
            resetForm()
            userDispatch({type:"SERVER_ERROR",payload:""})
            navigate('/dashboard')
        }catch(err){
            console.log(err.response.data.error);
            userDispatch({type:"SERVER_ERROR",payload:err.response.data.error})
        }
    }

    const adminExists = async () => {
        try {
            const response = await axios.get("/check-admin", {
                headers: { Authorization:localStorage.getItem("token")} });

            if (response.data.exists) {
                userDispatch({ type: "ADMIN_EXISTS" });
            }
        } catch (err) {
            console.log("admin error:", err.response?.data?.error);
        }
    };

    const updateUser=(userData)=>{
        userDispatch({type:"UPDATE_USER",payload:userData})
    }


    const handleLogout=()=>{
        localStorage.removeItem("token");
        userDispatch({type:"LOGOUT"})
        navigate('/login')
    }
    

    return (
        <UserContext.Provider value={{...userState ,handleRegister,handleLogin,handleLogout,adminExists,updateUser}}>
            {props.children}
        </UserContext.Provider>
    )
}