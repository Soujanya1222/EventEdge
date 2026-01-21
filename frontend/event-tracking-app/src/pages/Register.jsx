import { useFormik } from "formik"
import { Input } from "../componets/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../componets/ui/card";
import { Button } from "../componets/ui/button";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
export default function Register(props){
    const {handleRegister,serverErrors,checkAdminExists }=useContext(UserContext)

    const formik=useFormik({
        initialValues:{
            name:"",
            email:"",
            password:"",
            role:""
            
        },
        onSubmit:(values,{resetForm})=>{
            console.log("formik data",values)
            handleRegister(values,resetForm)
        }
    })
    return(
        <div className="flex justify-center items-center h-screen">
           <Card>
            <CardHeader>
                <CardTitle>Create Account</CardTitle>
                  {serverErrors&& <p style={{color:"red"}}>{serverErrors}</p>}
            </CardHeader>
            <br/>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                <div>
                <Input type="text" name="name" placeholder="Enter UserName"value={formik.values.name} onChange={formik.handleChange}/>
                </div><br/>

                <div>
                    <Input type="email" name="email"  placeholder="Enter Email" value={formik.values.email} onChange={formik.handleChange}/>
                </div><br/>

                <div>
                    <Input type="password" name="password"placeholder="Enter Password" value={formik.values.password} onChange={formik.handleChange}/>
                </div><br/>
                

                <select 
                        name="role" 
                        value={formik.values.role} 
                        onChange={formik.handleChange}
                        className="border rounded p-2 w-full"
                >
                <option value="">Select Role</option>
                
                <option value="organiser">Organiser</option>
                <option value="attendee">Attendee</option>

                {!checkAdminExists && (
                    <option value="admin">Admin</option>
                )}
                </select><br/>
                <br/>

                <Button type="submit" className="w-full">Register</Button>
                </form>
                <p className="text-center text-sm mt-4">
                Create an account?{" "}
                <Link to="/login" className="text-blue-600 font-medium hover:underline">
                Login
                </Link>
                </p>
            </CardContent>
           </Card>
        </div>
    )
}