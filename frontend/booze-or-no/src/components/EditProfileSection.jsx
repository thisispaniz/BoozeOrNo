import React, { useState } from "react";

function EditProfileSection({ setIsEditing }) {
    const [formData, setFormData] = useState({
        name: "Max Mustermann",
        age: 24,
        sex: "Male",
        weight: "",
        location: "Pfarrkirchen, Bayern"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));
    };

    const handleSave = () => {
        setIsEditing(false);
    }

    return (
                <section className="profile-section">
            <div className="main-part">
                <img className="avatar" src="./avatar-1577909_1280.png" alt="Avatar" />
                <div className="column right">
                    <div className="row">
                        <div className="column">
                            <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <label>Age: <input type="number" name="age" value={formData.age} onChange={handleChange} /></label>
                        <label>Sex: 
                            <select name="sex" value={formData.sex} onChange={handleChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>
                        <label>Weight (kg): <input type="number" name="weight" value={formData.weight} onChange={handleChange} /></label>
                        <label>Location: <input type="text" name="location" value={formData.location} onChange={handleChange} /></label>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EditProfileSection;