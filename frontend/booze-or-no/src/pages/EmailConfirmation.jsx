import '../App.css';
import NavBar from "../components/NavBar";
import TagLine from '../components/TagLine';

const EmailConfirmation = () => {

    return (
        <>
            <NavBar />
            <h1>Thank you for confirming your email!</h1>
            <button className="register-btn">LOGIN</button>
            <TagLine />
        </>
    );
};

export default EmailConfirmation;