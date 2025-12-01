import { useReducer } from "react"
import UserContext from "../../context/UserContext"
import axios from "../../config/axios"
import { useNavigate } from "react-router-dom"

const authProvider=(state,action)=>{
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
    }
}

export default function AuthProvider(props){
    const navigate=useNavigate()
    const [userState,userDispatch]=useReducer(authProvider,{
        user:null,
        isLoggedIn:false,
        serverErrors:''
    })


    const handleRegister=async(formData,resetForm)=>{
        try{
            const response=await axios.post('/users/register',formData)
            console.log(response.data)
            userDispatch({type:"SERVER_ERROR", payload:" "})
            resetForm();
            navigate('/login')


        }catch(err){
            console.log(err.message)
            userDispatch({type:'SERVER_ERROR',payload:err.response.data.error})
        }
    }


    const handleLogin=async(formData,resetForm)=>{
        try{
            const response=await axios.post('/user/login',formData)
            console.log(response.data);
            userDispatch({type:"LOGIN" ,payload:response.data})
            navigate('/dashboard')
        }catch(err){
            console.log(err);
            userDispatch({type:"SERVER_ERROR"})
        }
    }

    const handleLogout=()=>{
        localStorage.removeItem("token");
        userDispatch({type:"LOGOUT"})
    }
    

    return (
        <UserContext.Provider value={{...userState ,handleRegister,handleLogin,handleLogout}}>
            {props.children}
        </UserContext.Provider>
    )
}