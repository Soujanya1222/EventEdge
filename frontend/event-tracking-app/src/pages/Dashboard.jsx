import { useContext } from "react";
import UserContext from "../context/UserContext";
import AdminDashboard from "./Admin Page/AdminDashboard";
import OrganiserDashboard from "./Organiser Pages/OrganiserDashboard";
import AttendeeDashboard from "./Attendee Page/AttendeeDashboard";
import Sidebar from "../componets/ui/Sidebar";
import Navbar from "../componets/ui/Navbar";
import "../styles/dashboard.css";

export default function Dashboard() {
  const { user, isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) return <p>Please log in to access the Dashboard</p>;
  if (!user) return <p>Loading...</p>;

  let Content;
  if (user.role === "admin") Content = <AdminDashboard />;
  else if (user.role === "organiser") Content = <OrganiserDashboard />;
  else if (user.role === "attendee") Content = <AttendeeDashboard />;
  else return <h2>No role assigned</h2>;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content-area">{Content}</div>
      </div>
    </div>
  );
}
