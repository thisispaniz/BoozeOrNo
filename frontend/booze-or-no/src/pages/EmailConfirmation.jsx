import '../App.css';
import Footer from '../components/Footer';
import { Link } from "react-router-dom"; <Link to="/login" className="nav-link-yellow">Login</Link>

const EmailConfirmation = () => {

    return (
        <>
            <h1>Thank you for confirming your email!</h1>
            <Link to="/login" className="nav-link-yellow">Login</Link>
            <Footer />
        </>
    );
};

export default EmailConfirmation;
