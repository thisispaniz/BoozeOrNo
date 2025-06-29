import Footer from "../components/Footer";

const TermsOfService = () =>  {
    return (
        <div className="page-container">
        <h1>Terms of Service</h1>
        <h4 style={{color: "#FFC300"}}>Effective Date: [01.06.2025]</h4>
        <p>Welcome to <strong>BoozeOrNo</strong>! These Terms of Service (“Terms”) govern your access to and use of our website, tools, and services (collectively, the “Services”), including our Medication X Alcohol Checker and Alcohol Metabolism Planner.</p>
        <p>By accessing or using BoozeOrNo, you agree to these Terms. If you do not agree, please do not use our Services.</p>
        <h2>1. Use of the Services</h2>
        <p>BoozeOrNo is designed to support safe and informed decision-making around alcohol consumption. Our Services include:</p>
        <ul>
            <li><strong>Medication X Alcohol Checker</strong>: Helps identify known risks when combining alcohol with medications.</li>
            <li><strong>Alcohol Metabolism Planner</strong>: Estimates how much alcohol you can consume to be sober by a chosen time.</li>
        </ul>
        <p>These tools are <strong>informational only</strong> and should <strong>not be considered medical advice</strong>. Always consult a licensed healthcare provider before making decisions about alcohol or medication.</p>
        <h2>2. Eligibility</h2>
        <p>You must be at least 18 years old to use our Services. By using BoozeOrNo, you represent and warrant that you meet this age requirement and are fully able and competent to enter into and abide by these Terms.</p>
        <h2>3. No Medical Advice</h2>
        <p>The content provided by BoozeOrNo, including any results from its tools, is <strong>not intended as a substitute for professional medical advice, diagnosis, or treatment</strong>. Never disregard or delay seeking medical advice because of something you read or calculate on this site.</p>
        <p><strong>Always consult your doctor or pharmacist</strong> before combining alcohol with any medication or making decisions related to your health.</p>
        <h2>4. Disclaimer of Warranties</h2>
        <p>Your use of BoozeOrNo is <strong>at your own risk</strong>. The Services are provided “<strong>as is</strong>” and “<strong>as available</strong>” without warranties of any kind, express or implied.</p>
        <p>We do not warrant that:</p>
        <ul>
            <li>The Services will be accurate, complete, or reliable.</li>
            <li>Any errors will be corrected.</li>
            <li>The Services will meet your specific requirements.</li>
        </ul>
        <h2>5. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, BoozeOrNo and its creators, affiliates, or partners <strong>shall not be liable</strong> for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data or other intangible losses resulting from:</p>
        <ul>
            <li>Your use or inability to use the Services;</li>
            <li>Any content obtained through the Services;</li>
            <li>Any decisions or actions you take based on the Services.</li>
        </ul>
        <h2>6. Privacy</h2>
        <p>Your use of BoozeOrNo is subject to our <a href="/privacypolicy">Privacy Policy</a>, which explains how we collect, use, and protect your personal data. By using the Services, you consent to the collection and use of information as described in the Privacy Policy.</p>
        <h2>7. Modifications</h2>
        <p>We may update or change these Terms at any time. If we make material changes, we will provide notice via our website or other means. Continued use of the Services after changes become effective constitutes your acceptance of the updated Terms.</p>
        <h2>8. Termination</h2>
        <p>We reserve the right to suspend or terminate your access to the Services at any time, with or without cause or notice, including if we believe you have violated these Terms.</p>
        <h2>9. Governing Law</h2>
        <p>These Terms are governed by the laws of the jurisdiction where BoozeOrNo is based (Bayern, Germany), without regard to conflict of law principles.</p>
        <h2>10. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <ul>
            <li><strong>Email:</strong> boozeorno@email.com</li>
        </ul>

        <p><em>By using BoozeOrNo, you acknowledge that you have read, understood, and agreed to these Terms of Service.</em></p>
            <Footer />
        </div>
    );
};

export default TermsOfService;
