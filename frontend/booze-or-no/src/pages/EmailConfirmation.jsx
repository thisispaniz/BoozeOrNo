import '../App.css';
import NavBar from "../components/NavBar";
import Footer from '../components/Footer';

const EmailConfirmation = () => {

    return (
        <>
            <NavBar />
            <h1>Thank you for confirming your email!</h1>
            <button className="register-btn">LOGIN</button>
            <Footer />
        </>
    );
};

export default EmailConfirmation;