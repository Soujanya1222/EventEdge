import {Routes,Route,Link} from "react-router-dom"
import Account from "./pages/Account"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./App.css"
import ScanQR from "./pages/Organiser Pages/ScanQR";
import "./styles/dashboard.css"
import UsersList from "./pages/Admin Page/UsersList"
import Dashboard from "./pages/Dashboard"
import OrganiserList from "./pages/Admin Page/OrganiserList"
import { useContext,useEffect } from "react"
import UserContext from "./context/UserContext"
import EventList from "./pages/Organiser Pages/EventList"
import EventForm from "./pages/Organiser Pages/EventForm"
import { useDispatch } from "react-redux"
import {   fetchOrganisers, fetchUsers } from "./slices/userSlice"
import { fetchAdminEvents, fetchEvents, fetchUserEvents } from "./slices/eventSlice"
import EventDetails from "./pages/Attendee Page/EventDetails"
import PaymentSuccess from "./pages/Attendee Page/PaymentSuccess"
import MyTickets from "./pages/Attendee Page/MyTickets"
import BookedUsers from "./pages/Organiser Pages/BookedUsers"
import { bookedUsers } from "./slices/ticketSlice"
import { totalTickets } from "./slices/ticketSlice"
import Ticket from "./pages/Organiser Pages/Tickets"
import ReviewPage from "./pages/ReviewPage"
import OrganiserReviews from "./pages/Organiser Pages/OrganiserReviews"
import SearchResults from "./pages/SearchResults"
import Navbar from "./componets/ui/Navbar"
export default function App(){
  const {isLoggedIn,user}=useContext(UserContext)

  const dispatch=useDispatch()
  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(fetchAdminEvents())
      dispatch(fetchUsers())
      dispatch(fetchOrganisers())
    }
    if(user?.role==="organiser"){
      dispatch(bookedUsers())
      dispatch(fetchEvents())
      dispatch(totalTickets())
    }if(user?.role==="attendee"){
      dispatch(fetchUserEvents())
    }
             
  }, [user])
    
    
  return (
    <div >
      {/* {!(isLoggedIn || localStorage.getItem("token")) ? (
        <ul className="nav-link">
           <li><Link to="/">Home</Link></li>
           <li><Link to="/register">Register</Link></li>
           <li><Link to="/login">Login</Link></li>
        </ul>
      ) : (
        <Navbar />
      )} */}

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/usersList" element={<UsersList/>}/>
        <Route path="/organiserList" element={<OrganiserList/>}/>
        <Route path="/organiser/events" element={<EventList/>}/>
        <Route path="/create-event" element={<EventForm/>}/>
        <Route path="/create-event/:id" element={<EventForm />} />
        <Route path="/events/:id" element={<EventDetails/>}/>
        <Route path="/payment-success" element={<PaymentSuccess/>}/>
        <Route path="/my-tickets" element={<MyTickets/>}/>
        <Route path="/organiser/bookings" element={<BookedUsers />} />
        <Route path="/tickets" element={<Ticket/>}/>
        <Route path="/organiser/scan-qr" element={<ScanQR />} />
        <Route path="/review/:eventId" element={<ReviewPage/>}/>
        <Route path="/organiser/reviews" element={<OrganiserReviews/>}/>
        <Route path="/search" element={<SearchResults/>}/>
      </Routes>

    </div>
  )
}