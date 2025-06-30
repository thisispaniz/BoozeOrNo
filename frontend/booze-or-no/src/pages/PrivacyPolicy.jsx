import '../App.css';
import Footer from '../components/Footer';

const PrivacyPolicy = () =>  {
    return (
        <div className="page-container">
            <h1>PRIVACY POLICY</h1>
            <h4 style={{color: "#FFC300"}}>Effective Date: [01.06.2025]</h4>
            <p>
            BoozeOrNo is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose your information when you use our website/app BoozeOrNo.</p>
            <p><h5 style={{color: "white"}}>1. Information We Collect</h5>

            We may collect the following types of information:

                Personal Information: such as your name, email address, or other contact details if you voluntarily submit them through a contact form or sign-up.

                Usage Data: including your IP address, browser type, pages visited, and time spent on the site.</p>

            <p><h5 style={{color: "white"}}>2. How We Use Your Information</h5>

            We may use the collected information to:

                Provide and maintain our service

                Respond to inquiries or support requests

                Improve user experience

                Monitor usage trends and technical performance</p>

            <p><h5>3. Sharing Your Information</h5>

            We do not sell your personal information. We may share your data with:

                Service providers who help us operate the website (e.g., hosting, analytics)

                Law enforcement if required by law</p>

            <p><h5>4. Data Security</h5>

            We take reasonable measures to protect your personal information but cannot guarantee absolute security.</p>
            <p><h5>5. Your Rights</h5>

            Depending on your location, you may have rights under privacy laws, including the right to access, correct, or delete your data. Please contact us at info@boozeorno.com to exercise these rights.</p>
            <p><h5>6. Changes to This Policy</h5>

            We may update this Privacy Policy occasionally. Changes will be posted on this page with an updated effective date.</p>
            <p><h5>7. Contact Us</h5>

            If you have any questions about this Privacy Policy, please contact us at:
            info@boozeorno.com</p>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;