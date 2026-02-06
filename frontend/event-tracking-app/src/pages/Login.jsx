import {useFormik} from "formik"
import { Input } from "../componets/ui/input"
import { Button } from "../componets/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "../componets/ui/card"
import { useContext } from "react"
import UserContext from "../context/UserContext"
import { Link } from "react-router-dom"
import * as Yup from "yup";

export default function Login(props){
    const {handleLogin,serverErrors}=useContext(UserContext)
    const formik=useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema: Yup.object({
            email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),

        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required")
        }),
        onSubmit:(values,{resetForm})=>{
                console.log(values)
                handleLogin(values,resetForm);

        }
   })
    return(
        <div className="flex justify-center items-center h-screen">

        <Card className="w-[350px] p-4">
        <CardHeader>
          <CardTitle className="text-center">Login With Us</CardTitle>
            {serverErrors&& <p style={{color:"red"}}>{serverErrors}</p>}
        </CardHeader>
        <br/>
        
        <CardContent>
            <form onSubmit={formik.handleSubmit}>
                <div>
                   
                    <Input type="email" name="email" placeholder="   Enter Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.touched.email && formik.errors.email && (<p className="text-red-500 text-sm">{formik.errors.email}</p>)}
                </div><br/>
                <div>
           
                    <Input type="password" name="password" placeholder="   Enter Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.touched.password && formik.errors.password && (<p className="text-red-500 text-sm">{formik.errors.password}</p>)}
                </div><br/>
                <Button type="submit" className="w-full" disabled={!formik.isValid}>
              Login
            </Button>

            </form>

            <p className="text-center text-sm mt-4">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 font-medium hover:underline">
                Sign In
                </Link>
                </p>
           </CardContent>
           </Card>
        </div>
    )
}