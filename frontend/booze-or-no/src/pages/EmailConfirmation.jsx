import '../App.css';
import NavBar from "../components/NavBar";
import Footer from '../components/Footer';

const EmailConfirmation = () => {

    return (
        <div className='page-container'>
            <NavBar />
            <main className='center-content'>
                <h1>Thank you for confirming your email!</h1>
                <a href="/login" className="login-link">Login to your account</a>
            </main>
            <Footer />
        </div>
    );
};

export default EmailConfirmation;