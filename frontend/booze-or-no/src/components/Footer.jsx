import '../App.css'

function Footer() {
    return (
        <div className="footer">
            <div className="leftside">
                <div className="logo">
                    <a href="/" ><img src="/Booze or No.svg" alt="BoozeOrNo" /></a>
                </div>
                <p className='footer-rights'>©Booze or No - All rights reserved</p>
            </div>
            <nav className="nav">
                <a href="/aboutus" className="nav-link">About us</a>
                <a href="/contact" className="nav-link">contact us</a>
                <a href="/privacypolicy" className="nav-link">privacy policy</a>
                <a href="/termsofuse" className="nav-link">terms of use</a>
            </nav>
        </div>
    )}

export default Footer;
