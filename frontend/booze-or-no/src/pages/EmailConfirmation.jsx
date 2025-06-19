import { Link } from "react-router-dom";
import '../App.css';
import Footer from '../components/Footer';
import NavBar from "../components/NavBar";

const EmailConfirmation = () => {

    return (
        <div className='page-container'>
            <NavBar />
            <main className='center-content'>
                <h1>Thank you for confirming your email!</h1>
                <Link to="/login" className="login-link-btn">Login to your account</Link>
            </main>
            <Footer />
        </div>
    );
};

export default EmailConfirmation;