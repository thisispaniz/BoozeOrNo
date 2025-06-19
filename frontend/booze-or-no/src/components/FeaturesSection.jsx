import "../App.css";

function FeaturesSection() {
    return (
        <section className="d-flex flex-column align-items-center justify-content-center text-start w-100 features-section py-5">
            <div className="w-45">
                <h2 className="h1-black">CREATE AN ACCOUNT TO ACCESS FULL FEATURES</h2>
                <p className="p-black">&#10003; Enter as many long-term or short-term medications</p>
                <p className="p-black">&#10003; Enter medical conditions</p>
                <p className="p-black">&#10003; Get personalized recommendations based on your alcohol metabolism</p>
                <div>
                    <a href="/signup"><button className="sign-me-up w-100">SIGN ME UP</button></a>            
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;