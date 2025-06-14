import React, { useState } from "react";
import "../App.css";

function ProfileSection() {

    const [isEditing, setIsEditing] = useState(false);

    const [profileData, setProfileData] = useState({
        name: "Max Mustermann",
        age: "24",
        sex: "Male",
        weight: "",
        location: "Pfarrkirchen, Bayern"
    });

    const [tempData, setTempData] = useState(profileData);

    const handleEdit = () => {
        setTempData(profileData);
        setIsEditing(true);
    };

    const handleSave = () => {
        setProfileData(tempData);
        setIsEditing(false);
        console.log("Saving profile data: ", tempData)
    };

    const handleCancel = () => {
        setTempData(profileData);
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        setTempData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    return (
        <section className="profile-section">
            <div className="main-part">
                <img className="avatar" src="./avatar-1577909_1280.png" alt="" />
                <div className="column right">
                    <div className="row">
                        <div className="column">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={tempData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="edit-input name-input"
                                />
                            ) : (
                                <h2>{profileData.name}</h2>
                            )}
                        </div>
                        <h3>Age:
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={tempData.age}
                                    onChange={(e) => handleInputChange('age', e.target.value)}
                                    className="edit-input age-input"
                                />
                            ) : (
                                <span className="info">{profileData.age}</span>
                            )}
                        </h3>
                        <h3>Sex:
                            {isEditing ? (
                                <select
                                    value={tempData.sex}
                                    onChange={(e) => handleInputChange('sex', e.target.value)}
                                    className="edit-input sex-select"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            ) : (
                                <span className="info">{profileData.sex}</span>
                            )}
                        </h3>
                        <h3>Weight:
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={tempData.weight}
                                    onChange={(e) => handleInputChange('weight', e.target.value)}
                                    placeholder="Enter weight (kg)"
                                    className="edit-input weight-input"
                                />
                            ) : (
                                <span>
                                    {profileData.weight ? (
                                        <span className="info">{profileData.weight} kg</span>
                                    ) : (
                                        <img className="danger" src="./Vector.svg" alt="" />
                                    )}
                                </span>
                            )}
                        </h3>
                        <h3>Location:
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={tempData.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    className="edit-input location-input"
                                />
                            ) : (
                                <span className="info">{profileData.location}</span>
                            )}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="profile-actions">
                {isEditing ? (
                    <>
                        <button onClick={handleSave} className="save-btn">
                            Save
                        </button>
                        <button onClick={handleCancel} className="cancel-btn">
                            Cancel
                        </button>
                    </>
                ) : (
                    <button onClick={handleEdit} className="edit-btn">
                        Edit Profile
                    </button>
                )}
            </div>
            <div className="danger">
                <h3><span className="info orange"><img className="danger" src="./Vector.svg" alt="" />      Completing your profile allows us to estimate your alcohol metabolism.  </span></h3>
            </div>
        </section>
    );
}

export default ProfileSection;