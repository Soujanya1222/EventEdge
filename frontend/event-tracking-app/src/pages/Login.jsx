import {useFormik} from "formik"
import { Input } from "../componets/ui/input"
import { Button } from "../componets/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "../componets/ui/card"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../context/UserContext"

export default function Login(props){
    const {handleLogin,serverErrors}=useContext(UserContext)
    const navigate=useNavigate()
   const formik=useFormik({
    initialValues:{
        email:"",
        password:""
    }
    ,onSubmit:(values,{resetForm})=>{
        console.log(values)
        handleLogin(values,resetForm());

    }
   })
    return(
        <div className="flex justify-center items-center h-screen">
        <Card className="w-[350px] p-4">
        <CardHeader>
          <CardTitle className="text-center">Login User</CardTitle>
        </CardHeader>
        <br/>
        <CardContent>
            <form onSubmit={formik.handleSubmit}>
                  {serverErrors&& <p>{serverErrors}</p>}
                <div>
                   
                    <Input type="email" name="email" placeholder="   Enter Email" value={formik.values.email} onChange={formik.handleChange}/>
                </div><br/>
                <div>
           
                    <Input type="password" name="password" placeholder="   Enter Password" value={formik.values.password} onChange={formik.handleChange}/>
                </div><br/>
                <Button type="submit" className="w-full">
              Login
            </Button>

            </form>
           </CardContent>
           </Card>
        </div>
    )
}