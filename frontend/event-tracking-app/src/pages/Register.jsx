import { useFormik } from "formik"
import { Input } from "../componets/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../componets/ui/card";
import { Button } from "../componets/ui/button";
import { useContext } from "react";
import UserContext from "../context/UserContext";
export default function Register(props){
    const {handleRegister,serverErrors}=useContext(UserContext)

    const formik=useFormik({
        initialValues:{
            name:"",
            email:"",
            password:"",
            role:""
            
        },
        onSubmit:(values,{resetForm})=>{
            console.log(values)
            handleRegister(values,resetForm)
            alert("Registerd Successfully")
        }
    })
    return(
        <div className="flex justify-center items-center h-screen">
           <Card>
            <CardHeader>
                <CardTitle>Create Account</CardTitle>
            </CardHeader>
            <br/>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    {serverErrors&& <p>{serverErrors}</p>}
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
                {/* {!adminExists&&<option value="admin">Admin</option>} */}
                <option value="organiser">Organiser</option>
                <option value="attendee">Attendee</option>
                </select><br/>
                <br/>

                <Button type="submit" className="w-full">Register</Button>
                </form>
            </CardContent>
           </Card>
        </div>
    )
}