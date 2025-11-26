import {useFormik} from "formik"
import { Input } from "../componets/ui/input"
import { Button } from "../componets/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "../componets/ui/card"
import { loginUser } from "../slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function Login(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {errors}=useSelector((state)=>{
        return state.users
    })
   const formik=useFormik({
    initialValues:{
        email:"",
        password:""
    },onSubmit:(values,{resetForm})=>{
        dispatch(loginUser(values))
        console.log(values)
        resetForm();
        navigate("/dashboard")

    }
   })
    return(
        <div className="flex justify-center items-center h-screen">
        {errors && <p>{errors}</p>}
        <Card className="w-[350px] p-4">
        <CardHeader>
          <CardTitle className="text-center">Login User</CardTitle>
        </CardHeader>
        <br/>
        <CardContent>
            <form onSubmit={formik.handleSubmit}>
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