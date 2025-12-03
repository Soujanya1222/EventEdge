import { useEffect, useReducer } from "react"
import UserContext from "../../context/UserContext"
import axios from "../../config/axios"
import { useNavigate } from "react-router-dom"

const userReducer=(state,action)=>{
    switch(action.type){
        case "LOGIN":{
            return {...state,isLoggedIn:true,user:action.payload,serverErrors:''}
        }
        case "LOGOUT":{
            return {...state,isLoggedIn:false,user:null}
        }
        case "SERVER_ERROR":{
            return {...state,serverErrors:action.payload}
        }
        case "ADMIN_EXISTS":{
            return {...state,isLoggedIn:true,user:action.payload,serverErrors:'',adminExists:true}
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
        }
    },[])


    const handleRegister=async(formData,resetForm)=>{
        try{
            const response=await axios.post('/users/register',formData)
            console.log(response.data)
            alert("Successfully Registered")
            resetForm();
            navigate('/login')


        }catch(err){
            console.log(err.message)
            userDispatch({type:'SERVER_ERROR',payload:err.response})
        }
    }


    const handleLogin=async(formData,resetForm)=>{
        try{
            const response=await axios.post('/user/login',formData)
            console.log(response.data);
            localStorage.setItem('token',response.data.token)
            const userResponse=await axios.get('/user/account',{headers:{Authorization:localStorage.getItem("token")}})
            console.log(userResponse)
            userDispatch({type:"LOGIN" ,payload:response.data})
            resetForm()
            navigate('/dashboard')
        }catch(err){
            console.log(err);
            userDispatch({type:"SERVER_ERROR",payload:err.response})
        }
    }

    const adminExists=async()=>{
        try{
            const response =await axios.get('/check-admin',{headers:{Authorization:localStorage.getItem("token")}})
            console.log(response.data);
            userDispatch({type:"ADMIN_EXISTS",payload:response.data})
        }catch(err){
            console.log(err);
            userDispatch({type:"SERVER_ERROR",payload:err.response})
        } 
    }

    const handleLogout=()=>{
        localStorage.removeItem("token");
        userDispatch({type:"LOGOUT"})
    }
    

    return (
        <UserContext.Provider value={{...userState ,handleRegister,handleLogin,handleLogout,adminExists}}>
            {props.children}
        </UserContext.Provider>
    )
}