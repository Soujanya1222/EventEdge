import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganisers,fetchUsers } from "../slices/userSlice";

export default function Account() {
    const dispatch=useDispatch()
  const { user, handleLogout } = useContext(UserContext);
  const{data}=useSelector((state)=>{
    return state.users;
  })
  useEffect(()=>{
    dispatch(fetchOrganisers())
    dispatch(fetchUsers())
  })
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");


  if (!user) return <p>Loading...</p>;

  const handleSave = () => {
    console.log("Updated profile:", { name, email });
    setEditMode(false);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        background: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>
        Account Details
      </h2>

      <div style={{ display: "grid", rowGap: "15px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Role:</strong>
          <span>{user.role}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Name:</strong>
          {editMode ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "60%"
              }}
            />
          ) : (
            <span>{user.name}</span>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Email:</strong>
          {editMode ? (
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "60%"
              }}
            />
          ) : (
            <span>{user.email}</span>
          )}
        </div>

        {user.role === "organiser" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Total Events:</strong>
              <span>{user.totalEvents || 0}</span>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                View My Events
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Create Event
              </button>
            </div>
          </>
        )}

        {user.role === "admin" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Total Users:</strong>
              <span>{data.length || 0}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Total Organisers:</strong>
              <span>{data.length || 0}</span>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Manage Users
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Manage Organisers
              </button>
            </div>
          </>
        )}

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          {editMode ? (
            <button
              onClick={handleSave}
              style={{
                padding: "8px 16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#FF9800",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Edit Profile
            </button>
          )}

          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
           >
            Logout
           
          </button>
        </div>
      </div>
    </div>
  );
}
