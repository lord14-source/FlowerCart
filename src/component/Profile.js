import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Profile.css'; // Import CSS file for styling

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8080/profile/01250d43-31e1-4aca-b870-df15b18d5e8a');
        
        if (!response.ok) {
          const errorText = await response.text(); // Get detailed error message
          throw new Error(`Failed to fetch profile: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Logout function
  const onLogout = () => {
    localStorage.removeItem("authToken"); // Remove authentication token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="profile-container">
      <h1>Profile Details</h1>
      {error && <p className="error">{error}</p>}
      {profile ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Mobile:</strong> {profile.mbl_no}</p>
          <p><strong>Street Address:</strong> {profile.strt_address}</p>
          <p><strong>City:</strong> {profile.city}</p>
          <p><strong>State:</strong> {profile.state}</p>
          <p><strong>Country:</strong> {profile.country}</p>
          <p><strong>PinCode:</strong> {profile.zip_code}</p>
          {/* ✅ Logout Button */}
          <button onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
