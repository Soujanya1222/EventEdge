import { useFormik } from "formik"
import LocationPicker from "../../componets/Components/Map"
import { useDispatch, useSelector } from "react-redux";
import { createEvents, fetchSingleEvent ,updateEvent} from "../../slices/eventSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/event.css"

export default function EventForm(props){
    const navigate=useNavigate()
    const {id}=useParams()
    const {singleEvent,errors}=useSelector(state=>state.events)
    const [previewImages, setPreviewImages] = useState([]);
    const [message, setMessage] = useState(null);
    const dispatch=useDispatch()
    useEffect(()=>{
        if(id){
            dispatch(fetchSingleEvent(id))
        }
    },[id,dispatch])

    useEffect(() => {
    if (singleEvent?.image&&id) {
      setPreviewImages(singleEvent.image);
    }else{
        setPreviewImages([])
    }
  }, [singleEvent,id]);

  const initialValues = id
    ? {
        title: singleEvent?.title || "",
        description: singleEvent?.description || "",
        category: singleEvent?.category || "",
        datetime: singleEvent?.datetime
          ? new Date(singleEvent.datetime).toISOString().slice(0, 16)
          : "",
        location: singleEvent?.location || { type: "Point", coordinates: [0, 0] },
        venue: singleEvent?.venue || "",
        price: singleEvent?.price || "",
        totalTickets: singleEvent?.totalTickets || "",
        soldTickets: singleEvent?.soldTickets || "",
        image: [],
      }
    : {
        title: "",
        description: "",
        category: "",
        datetime: "",
        location: { type: "Point", coordinates: [0, 0] },
        venue: "",
        price: "",
        totalTickets: "",
        soldTickets: "",
        image: [],
      };


    const formik=useFormik({
        enableReinitialize: true,
        initialValues,
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

                if (id) {
                        dispatch(updateEvent({ id,  formData }));
                        setMessage("Event updated successfully!");
                    } else {
                        dispatch(createEvents(formData));
                        setMessage("Event created successfully!");
                    }           
                     resetForm();

        }
    })
    return (
        <div className="event-form-container">
            <button onClick={() => navigate("/dashboard")} className="back-btn">
                ← Back to Dashboard
            </button>
            <h2 className="event-form-title">{id?"Edit":"Add Events"}</h2>
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
                    lat={formik.values.location.coordinates[1]||0}   
                    lng={formik.values.location.coordinates[0]||0}   
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


            {previewImages.length > 0 && (
            <div className="image-preview-container">
                {previewImages.map((img, i) => (
                <img key={i} src={img} alt={`Event ${i}`} className="image-preview" />
                ))}
            </div>
            )}


        <div>
            <button type="submit" className="submit-btn"> {id?"Update Event":"Add Event" }</button>
        </div>

        </form>
        </div>
    )
}