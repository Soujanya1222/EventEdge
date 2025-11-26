import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({children,allowedRoles}){
    const token=localStorage.getItem('token');
    const {data,isAuthenticated}=useSelector((state)=>{
        return state.users;
    })
    if(token && !isAuthenticated){  
        return <p>Loading...</p>
    }
    else if(token){
        return children;
    }else if(token){
        return <h2>Unauthorized</h2>
    }else if (allowedRoles && !allowedRoles.includes(user.role)){
         return <Navigate to="/dashboard" replace />;
    }
    else{
        return <Navigate to="/login"/>
    }
}