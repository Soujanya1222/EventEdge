import { useFormik } from "formik"
import LocationPicker from "../../componets/Components/Map"

export default function EventForm(props){
    const formik=useFormik({
        initialValues:{
            title:"",
            description:"",
            category:"",
            dateTime:"",
            venue:"",
            price: "",
            totalTickets: "",
            soldTickets: "",
            images: [],

        },
        onSubmit:(values)=>{
            console.log(values)
        }
    })
    return (
        <div>
            <h2>Add Events</h2>
        <form onSubmit={formik.handleSubmit}>
            <div>  
                <input type="text" name="title" placeholder="Event Title" value={formik.values.title} onChange={formik.handleChange} />
            </div>
            <div> 
                 <input type="text" name="description" placeholder="Enter description" value={formik.values.description} onChange={formik.handleChange} />
            </div>
            <div>  
                <input type="text" name="category" placeholder="Enter category" value={formik.values.category} onChange={formik.handleChange} />
            </div>
            <div> 
                <input type="text" name="venue" placeholder="Enter Venue" value={formik.values.venue} onChange={formik.handleChange} />
            </div>
            <div>  
                 <input type="number" name="price" placeholder="Enter Price" value={formik.values.price} onChange={formik.handleChange} />
            </div>
            <div>  
                 <input type="number" name="totalTickets" placeholder="Enter totalTickets" value={formik.values.totalTickets} onChange={formik.handleChange} />
            </div>
            <div>  
                 <input type="number" name="soldTickets" placeholder="Enter soldTickets" value={formik.values.soldTickets} onChange={formik.handleChange} />
            </div>
            <div>  
                <input type="datetime-local" name="dateTime" value={formik.values.dateTime} onChange={formik.handleChange} />
            </div>
             <p style={{ marginTop: "10px", fontWeight: "500" }}>Select Event Location</p>
            <LocationPicker
                setFieldValue={formik.setFieldValue}
                lat={formik.values.latitude}
                lng={formik.values.longitude}
            />
            <br/><br/>
        <div>
            <button>    <input type="submit" value=" Add Events"/></button>
        </div>

        </form>
        </div>
    )
}