import React, { useState, useEffect } from "react";
import MyIdenticon from './MyIdenticon';
import "../App.css";

function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const email = localStorage.getItem("email") || "User";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setFetchError("No token found, please log in.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const text = await res.text();
        let data = null;
        try {
          data = JSON.parse(text);
        } catch {
          console.error("Response not JSON:", text);
        }

        if (res.ok && data) {
          setProfileData(data);
          setTempData(data);
          setFetchError(null);
        } else {
          setFetchError(data?.detail || "Failed to load profile");
        }
      } catch (err) {
        setFetchError("Error fetching profile: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [localStorage.getItem("token")]);  // 👈 Will re-run when token is set

  const isFieldEmpty = (field) => {
    return !profileData[field] || profileData[field] === "";
  };

  const hasEmptyFields = () => {
    if (!profileData) return false;
    return isFieldEmpty("name") || isFieldEmpty("age") || isFieldEmpty("sex") || isFieldEmpty("weight") || isFieldEmpty("location");
  };

  const handleEdit = () => {
    setTempData(profileData);
    setIsEditing(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in.");
      return;
    }

    try {
      const res = await fetch("/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tempData),
      });

      const text = await res.text();
      let data = null;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Response not JSON:", text);
      }

      if (!res.ok) {
        throw new Error(data?.detail || "Failed to save profile.");
      }

      // ✅ Immediately re-fetch profile to get latest state from DB
      const freshRes = await fetch("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const freshText = await freshRes.text();
      let freshData = null;
      try {
        freshData = JSON.parse(freshText);
      } catch {
        console.error("Fresh response not JSON:", freshText);
      }

      if (freshRes.ok && freshData) {
        setProfileData(freshData);
        setTempData(freshData);
      }

      setIsEditing(false);
      console.log("Saved to DB:", freshData || data);
    } catch (err) {
      console.error("Save error:", err.message);
    }
  };


  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (fetchError) {
    return <div className="error">Error: {fetchError}</div>;
  }

  if (!profileData) {
    return <div>No profile data available.</div>;
  }

  return (
    <section className="profile-section">
      <div className="d-flex justify-content-between">
        <div className="main-part">
          {/* <img className="avatar" src="./avatar-1577909_1280.png" alt="Avatar" /> */}
          <MyIdenticon seed={email} size={295} />
          <div className="column right">
            <div className="row3">
              <div className="column">
                {isEditing ? (
                  <div className="d-flex">
                    <h3>
                      Name:
                    </h3>
                    <input
                      type="text"
                      value={tempData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="edit-input name-input"
                    />
                  </div>

                ) : (
                  <h2>
                    {isFieldEmpty("name") ? (
                      <img className="danger" src="./Vector.svg" alt="Missing name" />
                    ) : (
                      profileData.name
                    )}
                  </h2>
                )}
              </div>
              <h3>
                Age:
                {isEditing ? (
                  <input
                    type="number"
                    value={tempData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="edit-input age-input"
                  />
                ) : (
                  <span className="info">
                    {isFieldEmpty("age") ? (
                      <img className="danger" src="./Vector.svg" alt="Missing age" />
                    ) : (
                      profileData.age
                    )}
                  </span>
                )}
              </h3>
              <h3>
                Sex:
                {isEditing ? (
                  <select
                    value={tempData.sex}
                    onChange={(e) => handleInputChange("sex", e.target.value)}
                    className="edit-input sex-select"
                  >

                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <span className="info">
                    {isFieldEmpty("sex") ? (
                      <img className="danger" src="./Vector.svg" alt="Missing sex" />
                    ) : (
                      profileData.sex
                    )}
                  </span>
                )}
              </h3>
              <h3>
                Weight:
                {isEditing ? (
                  <input
                    type="number"
                    value={tempData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder="Enter weight (kg)"
                    className="edit-input weight-input"
                  />
                ) : (
                  <span>
                    {profileData.weight ? (
                      <span className="info">{profileData.weight} kg</span>
                    ) : (
                      <img className="info danger" src="./Vector.svg" alt="Missing weight" />
                    )}
                  </span>
                )}
              </h3>
              <h3>
                Location:
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="edit-input location-input"
                  />
                ) : (
                  <span className="info">
                    {isFieldEmpty("location") ? (
                      <img className="danger" src="./Vector.svg" alt="Missing location" />
                    ) : (
                      profileData.location
                    )}
                  </span>
                )}
              </h3>
            </div>
          </div>
        </div>

        <div className="profile-actions d-flex flex-column gap-1">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="save-btn" style={{ width: "100px" }}>
                Save
              </button>
              <button onClick={handleCancel} className="cancel-btn" style={{ width: "100px" }}>
                Cancel
              </button>
            </>
          ) : (
            <button onClick={handleEdit} className="edit-btn" style={{ width: "100px" }}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {hasEmptyFields() && (
        <div className="danger">
          <h3>
            <span className="info orange">
              <img className="danger" src="./Vector.svg" alt="Warning" /> Completing your
              profile allows us to estimate your alcohol metabolism.
            </span>
          </h3>
        </div>
      )}
    </section>
  );
}

export default ProfileSection;
