import { useFormik } from "formik"
import { Input } from "../componets/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../componets/ui/card";
import { Button } from "../componets/ui/button";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import * as Yup from "yup";

export default function Register(props){
    const {handleRegister,serverErrors,checkAdminExists }=useContext(UserContext)

    const formik=useFormik({
        initialValues:{
            name:"",
            email:"",
            password:"",
            role:""
            
        },
        validationSchema: Yup.object({
            name: Yup.string()
            .min(3, "Name must be at least 3 characters")
            .required("Name is required"),

            email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),

            password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),

            role: Yup.string()
            .required("Role is required")
        }),
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
                <Input type="text" name="name" placeholder="Enter UserName"value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.name && formik.errors.name && (<p className="text-red-500 text-sm">{formik.errors.name}</p>)}
                </div><br/>

                <div>
                    <Input type="email" name="email"  placeholder="Enter Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.touched.email && formik.errors.email && (<p className="text-red-500 text-sm">{formik.errors.email}</p>)}
                </div><br/>

                <div>
                    <Input type="password" name="password"placeholder="Enter Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.touched.password && formik.errors.password && (<p className="text-red-500 text-sm">{formik.errors.password}</p>)}
                </div><br/>
                

                <select 
                        name="role" 
                        value={formik.values.role} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="border rounded p-2 w-full"
                >
               

                <option value="">Select Role</option>
                
                <option value="organiser">Organiser</option>
                <option value="attendee">Attendee</option>
                 {formik.touched.role && formik.errors.role && (<p className="text-red-500 text-sm">{formik.errors.role}</p>)}

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