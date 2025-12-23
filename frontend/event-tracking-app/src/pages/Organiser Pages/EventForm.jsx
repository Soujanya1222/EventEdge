import { useFormik } from "formik"
import LocationPicker from "../../componets/Components/Map"
import { useDispatch, useSelector } from "react-redux";
import { createEvents } from "../../slices/eventSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/event.css"

export default function EventForm(props){
    const navigate=useNavigate()
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
            alert("Event created successfully!")

        }
    })
    return (
        <div className="event-form-container">
            <button onClick={() => navigate("/dashboard")} className="back-btn">
                ← Back to Dashboard
            </button>
            <h2 className="event-form-title">Add Events</h2>
            {errors && <p className="error-text">{errors}</p>}
            {message && <p className="success-text">{message}</p>}
        <form onSubmit={formik.handleSubmit} className="event-form">
            <div className="event-input">  
                <input type="text" name="title" placeholder="Event Title" value={formik.values.title} onChange={formik.handleChange} />
            </div>
            <div className="event-input"> 
                 <input type="text" name="description" placeholder="Enter description" value={formik.values.description} onChange={formik.handleChange} />
            </div>
            <div className="event-input">  
                <input type="text" name="category" placeholder="Enter category" value={formik.values.category} onChange={formik.handleChange} />
            </div>
            <div className="event-input"> 
                <input type="text" name="venue" placeholder="Enter Venue" value={formik.values.venue} onChange={formik.handleChange} />
            </div>
            <div className="event-input">  
                 <input type="number" name="price" placeholder="Enter Price" value={formik.values.price} onChange={formik.handleChange} />
            </div>
            <div className="event-input">  
                 <input type="number" name="totalTickets" placeholder="Enter totalTickets" value={formik.values.totalTickets} onChange={formik.handleChange} />
            </div>
            <div className="event-input">  
                 <input type="number" name="soldTickets" placeholder="Enter soldTickets" value={formik.values.soldTickets} onChange={formik.handleChange} />
            </div>
            <div className="event-input">  
                <input type="datetime-local" name="datetime" value={formik.values.datetime} onChange={formik.handleChange} />
            </div>
             <p className="location-title">Select Event Location</p>
              <div className="map-wrapper">
           <LocationPicker
                setFieldValue={formik.setFieldValue}
                lat={formik.values.location.coordinates[1]}   
                lng={formik.values.location.coordinates[0]}   
            />
            </div>

            <br/><br/>

            <input
                className="file-input"
                type="file"
                name="image"
                multiple
                onChange={(event) => {
                    const files = event.currentTarget.files;
                    formik.setFieldValue("image", files);
                }}
                />

        <div>
            <button type="submit" className="submit-btn"> Add Event </button>
        </div>

        </form>
        </div>
    )
}