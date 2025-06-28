import '../App.css';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";

const EmailConfirmation = () => {

    return (
        <div className='page-container'>
            <main className='center-content'>
                <h1>Thank you for confirming your email!</h1>
                <Link to="/login" className="login-link">Login to your account</Link>
            </main>
            <Footer />
        </div>
    );
};

export default EmailConfirmation;