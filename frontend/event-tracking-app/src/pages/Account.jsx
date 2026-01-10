import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount, fetchOrganisers,fetchUsers,changePassword } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";


export default function Account() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const { user, handleLogout,errors,updateUser } = useContext(UserContext);
  const{data:event}=useSelector((state)=>{
    return state.events;
  })

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user && token && user?.role==="admin") {
      dispatch(fetchOrganisers());
      dispatch(fetchUsers());
    }}, [user, dispatch]);
    
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handlePasswordChange = () => {
  if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  dispatch(
    changePassword({
      currentPassword,
      newPassword
    })
  ).then((res) => {
    if (res.meta.requestStatus === "fulfilled") {
      alert("Password updated successfully");
      setShowPasswordForm(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert(res.payload?.error || "Failed to update password");
    }
  });
};


 
    const COLORS = {
    primary: "#1E3A8A",
    secondary: "#2563EB",
    success: "#16A34A",
    warning: "#F59E0B",
    danger: "#DC2626",
    bg: "#F1F5F9",
    card: "#FFFFFF",
    text: "#0F172A",
    muted: "#64748B"
  };

  const buttonBase = {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer"
  };


  if (!user) return <p>Loading...</p>;

  const handleSave = () => {
    dispatch(updateAccount({name,email}))
    .then((res)=>{
      if(res.meta.requestStatus==="fulfilled"){
        updateUser(res.payload)
        setEditMode(false);
      }
      
    })
    .catch(()=>{
      dispatch(errors)
    })
  };


  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "32px",
        backgroundColor: COLORS.card,
        borderRadius: "14px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        fontFamily: "Inter, sans-serif",
        color: COLORS.text
      }}
    >

      <h2
        style={{
          marginBottom: "24px",
          fontSize: "24px",
          fontWeight: "600",
          borderBottom: "1px solid #E5E7EB",
          paddingBottom: "12px"
        }}
      >
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

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Password:</strong>
          <button
            style={{ ...buttonBase, backgroundColor: COLORS.warning, color: "#fff" }}
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            Change Password
          </button>
        </div>

        {showPasswordForm && (
          <div style={{ marginTop: "15px", display: "grid", rowGap: "10px" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type={showCurrentPassword?"text":"password"}
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                style={{ ...buttonBase, backgroundColor: COLORS.muted, color: "#fff" }}
              >
                {showCurrentPassword ? "Hide" : "Show"}
              </button>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                style={{ ...buttonBase, backgroundColor: COLORS.muted, color: "#fff" }}
              >
                {showNewPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ ...buttonBase, backgroundColor: COLORS.muted, color: "#fff" }}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                style={{ ...buttonBase, backgroundColor: COLORS.success, color: "#fff" }}
                onClick={handlePasswordChange}
              >
                Update Password
              </button>
              <button
                style={{ ...buttonBase, backgroundColor: COLORS.danger, color: "#fff" }}
                onClick={() => {
                  setShowPasswordForm(false);
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
              >
                Cancel
              </button>
            </div>
            </div>
          )}




        {user.role === "organiser" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Total Events:</strong>
              <span>{event.length}</span>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
             <button
                style={{
                  ...buttonBase,
                  backgroundColor: COLORS.secondary,
                  color: "#fff"
                }} onClick={()=>
                  navigate("/organiser/events")
                }
                
              >

                View My Events
              </button>
              <button
                style={{
                  ...buttonBase,
                  backgroundColor: COLORS.secondary,
                  color: "#fff"
                }}
                onClick={()=>navigate("/create-event")}
              >

                Create Event
              </button>
            </div>
          </>
        )}

      

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          {editMode ? (
            <>
             <button
              style={{
                ...buttonBase,
                backgroundColor: COLORS.secondary,
                color: "#fff"
              }} onClick={handleSave}
            >
              Save
            </button>
             <button
                style={{ ...buttonBase, backgroundColor: COLORS.danger, color: "#fff" }}
                onClick={() => {
                  setEditMode(false);
                  setName(user.name);
                  setEmail(user.email);
                }}
              >
                Cancel
              </button></>
          ) : (
          <button
              style={{
                ...buttonBase,
                backgroundColor: COLORS.secondary,
                color: "#fff"
              }}
              onClick={()=>{
                setName(user.name);
                setEmail(user.email);
                setEditMode(true);
              }
                
                }
            >
              Edit Profile
            </button>
          )}

           <button
                style={{
              ...buttonBase,
              backgroundColor: COLORS.secondary,
              color: "#fff"
            }} onClick={handleLogout}
          >
            Logout
           
          </button>
        </div>
      </div>
    </div>
  );
}
