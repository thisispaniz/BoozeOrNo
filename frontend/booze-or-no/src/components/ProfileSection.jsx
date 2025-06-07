import React from "react";
import "../App.css";

function ProfileSection() {
    return (
        <section className="profile-section">
            <div className="main-part">
                <img className="avatar" src="./avatar-1577909_1280.png" alt="" />
                <div className="column right">
                    <div className="row">
                        <div className="column">
                            <h2>Max Mustermann</h2>
                        </div>
                        <h3>Age: <span className="info">24</span></h3>
                        <h3>Sex: <span className="info">Male</span></h3>
                        <h3>Weight: <span><img className="danger" src="./Vector.svg" alt="" /></span></h3>
                        <h3>Location: <span className="info">Pfarrkirchen, Bayern</span></h3>
                    </div>
                </div>
            </div>
            <div className="danger">
                <h3><span className="info orange"><img className="danger" src="./Vector.svg" alt="" />      Completing your profile allows us to estimate your alcohol metabolism.  </span></h3>
            </div>
        </section>
    );
}

export default ProfileSection;