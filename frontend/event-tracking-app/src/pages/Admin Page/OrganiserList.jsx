import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrganisers } from "../../slices/userSlice";
const ITEMS_PER_PAGE=5
export default function OrganiserList() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [currentPage,setCurrentPage]=useState(1)
  const startIndex=(currentPage-1)*ITEMS_PER_PAGE
  const { organisers} = useSelector((state) => state.users);
   const currentOrganiser=organisers.slice(
        startIndex,
        startIndex+ITEMS_PER_PAGE
    )
    const totalPages=Math.ceil(organisers.length/ITEMS_PER_PAGE)
  useEffect(()=>{
    dispatch(fetchOrganisers())
  },[dispatch])
  return (
    <div className="admin-table-container">
      <button onClick={() => navigate("/dashboard")} className="back-btn">
        ← Back to Dashboard
      </button>

      <table className="border border-black border-collapse w-full mt-4">
        <thead>
          <tr>
            <th className="border border-black p-3">Organiser Name</th>
            <th className="border border-black p-3">Organiser Email</th>
            <th className="border border-black p-3">Events Organised</th>
            <th className="border border-black p-3">Events & Tickets Sold</th>
          </tr>
        </thead>

        <tbody>
          {organisers.length === 0 ? (
            <tr>
              <td colSpan="4" className="border p-3 text-center">
                No organisers found
              </td>
            </tr>
          ) : (
            currentOrganiser.map((ele) => (
              <tr key={ele._id}>
                <td className="border border-black p-3">{ele.name}</td>
                <td className="border border-black p-3">{ele.email}</td>
                <td className="border border-black p-3">{ele.eventsOrganised}</td>
                <td className="border border-black p-3">
                  {ele.events && ele.events.length > 0 ? (
                    <ul className="organiser-events-list" style={{margin:0,paddingLeft:18}}>
                      {ele.events.map((ev) => (
                        <li key={ev._id}>
                          <strong>{ev.title}</strong>: {ev.ticketsSold}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>No events</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
       {organisers.length > ITEMS_PER_PAGE && (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                marginTop: "24px"
            }}>
            
            <button disabled={currentPage === 1}onClick={() => setCurrentPage(currentPage - 1)}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              background: "#0b87c1",
              color: "white",
              cursor: "pointer",
              opacity: currentPage === 1 ? 0.5 : 1
            }}>Prev </button>
            <span style={{ fontWeight: "600", color: "#555" }}> Page {currentPage} of {totalPages} </span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              background: "#0b87c1",
              color: "white",
              cursor: "pointer",
              opacity: currentPage === totalPages ? 0.5 : 1
            }}>Next</button>
        </div>
      )}
     
    </div>
  );
}
