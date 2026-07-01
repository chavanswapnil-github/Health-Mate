import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("user"));
      if (!data) navigate("/login");
      setUser(data);
    } catch {
      navigate("/login");
    }
  }, []);

  if (!user) return null;

  return (
    <div style={{ maxWidth: 900, margin: "30px auto" }}>
      <h2>Your Profile</h2>
      <div className="card p-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        <p><strong>Role:</strong> {user.isAdmin ? "Admin" : "User"}</p>

        <button 
          className="btn btn-success mt-3"
          onClick={() => navigate("/history")}
        >
          View Saved Diet Plans
        </button>

        <button 
          className="btn btn-outline-success mt-3 ms-2"
          onClick={() => navigate("/diet-plan")}
        >
          Generate New Diet Plan
        </button>
      </div>
    </div>
  );
};

export default Profile;
