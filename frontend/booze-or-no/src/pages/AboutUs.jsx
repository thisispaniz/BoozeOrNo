import NavBar from "../components/NavBar";
import NavBarLoggedIn from "../components/NavBar-LoggedIn";
import Footer from "../components/Footer";

const AboutUs = () =>  {
    return (
        <div className="page-container">
            <NavBar />
            <h1>ABOUT</h1>
            <p>Welcome to Booze or No, a tool to help you drink more safely if you're taking medications or managing health conditions.
We get it: figuring out how alcohol mixes with your meds or health issues isn’t always easy. That’s why we built this platform. Just enter what you’re taking or dealing with, and we’ll give you a rough idea of how much alcohol might be okay for you. And what that looks like in real drinks.</p>
            <h2>WHAT you should know</h2>
            <p>We use up to date, science-backed info to make our recommendations. But we're not your doctor, and this tool isn’t medical advice. Everyone’s body is different, and the safest option is always to check with your doctor—or to skip the drink altogether.</p>
            <h2>OUR GOAL</h2>
            <p>We want to make it easier for people to stay safe and informed. Whether you're planning a night out or just curious, we’re here to help you make smarter choices about drinking.</p>
            <Footer />
        </div>
    );
};

export default AboutUs;

