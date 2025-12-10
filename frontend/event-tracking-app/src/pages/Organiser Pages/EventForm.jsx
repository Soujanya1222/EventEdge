import { useFormik } from "formik"
import LocationPicker from "../../componets/Components/Map"
import { useDispatch, useSelector } from "react-redux";
import { createEvents } from "../../slices/eventSlice";
import { useState } from "react";

export default function EventForm(props){
    const {errors}=useSelector(state=>state.events)
    const [message, setMessage] = useState(null);
    const dispatch=useDispatch()
    const formik=useFormik({
        initialValues:{
            title:"",
            description:"",
            category:"",
            datetime:"",
            location: {
            type: "Point",
            coordinates: [0, 0] 
            },

            venue:"",
            price: "",
            totalTickets: "",
            soldTickets: "",
            image: [],

        },
        onSubmit:(values,{resetForm})=>{
            console.log(values);
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                if(key=="location"){
                    formData.append("location", JSON.stringify(values.location));
                }
                else if (key === "image") {
                    for (let i = 0; i < values.image.length; i++) {
                    formData.append("image", values.image[i]); 
                    }
                } else {
                    formData.append(key, values[key]);
                }
                });

            dispatch(createEvents(formData));
            resetForm();
            setMessage(alert("Event created successfully!"));
        }
    })
    return (
        <div>
            <h2>Add Events</h2>
            {errors && <p style={{color:"red"}}>{errors}</p>}
            {message && <p style={{color:"green"}}>{message}</p>}
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
                <input type="datetime-local" name="datetime" value={formik.values.datetime} onChange={formik.handleChange} />
            </div>
             <p style={{ marginTop: "10px", fontWeight: "500" }}>Select Event Location</p>
           <LocationPicker
                setFieldValue={formik.setFieldValue}
                lat={formik.values.location.coordinates[1]}   
                lng={formik.values.location.coordinates[0]}   
            />

            <br/><br/>

            <input
                type="file"
                name="image"
                multiple
                onChange={(event) => {
                    const files = event.currentTarget.files;
                    formik.setFieldValue("image", files);
                }}
                />

        <div>
            <button><input type="submit" value=" Add Events"/></button>
        </div>

        </form>
        </div>
    )
}