import { useFormik } from "formik"
import { Input } from "../componets/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../componets/ui/card";
import { Button } from "../componets/ui/button";
import { useContext } from "react";
import UserContext from "../context/UserContext";
export default function Register(props){
    const {handleRegister,serverErrors,adminExists}=useContext(UserContext)

    const formik=useFormik({
        initialValues:{
            name:"",
            email:"",
            password:"",
            role:""
            
        },
        validate: (values) => {
        const errors = {};

        if (!values.name) errors.name = "Please enter your name";
        if (!values.email) errors.email = "Please enter your email";
        if (!values.password) errors.password = "Please enter your password";
        if (!values.role) errors.role = "Please select a role";

        return errors;
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
                <div>
                <Input type="text" name="name" placeholder="Enter UserName"value={formik.values.name} onChange={formik.handleChange}/>
                </div><br/>
                  {formik.errors.name && <p className="text-red-500">{formik.errors.name}</p>}

                <div>
                    <Input type="email" name="email"  placeholder="Enter Email" value={formik.values.email} onChange={formik.handleChange}/>
                </div><br/>
                  {formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}

                <div>
                    <Input type="password" name="password"placeholder="Enter Password" value={formik.values.password} onChange={formik.handleChange}/>
                </div><br/>
                  {formik.errors.password && <p className="text-red-500">{formik.errors.password}</p>}

                <select 
                        name="role" 
                        value={formik.values.role} 
                        onChange={formik.handleChange}
                        className="border rounded p-2 w-full"
                >
                <option value="">Select Role</option>
                {!adminExists&&<option value="admin">Admin</option>}
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