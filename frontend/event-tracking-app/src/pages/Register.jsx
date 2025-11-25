import { useFormik } from "formik"
import { Input } from "../componets/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../componets/ui/card";
import { Button } from "../componets/ui/button";
import { registerUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";
export default function Register(){
    const dispatch=useDispatch();

    const formik=useFormik({
        initialValues:{
            name:"",
            email:"",
            password:""
            
        },
        onSubmit:(values,{resetForm})=>{
            console.log(values)
            dispatch(registerUser(values))
            resetForm();
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
                <div>
                    <Input type="email" name="email"  placeholder="Enter Email" value={formik.values.email} onChange={formik.handleChange}/>
                </div><br/>
                <div>
                    <Input type="password" name="password"placeholder="Enter Password" value={formik.values.password} onChange={formik.handleChange}/>
                </div><br/>
                <Button type="submit" className="w-full">Register</Button>
                </form>
            </CardContent>
           </Card>
        </div>
    )
}