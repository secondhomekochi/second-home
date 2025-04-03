import React from 'react';
import { Twitter, Facebook, Instagram, Github } from 'lucide-react';
import '../styles/Footer.css'
import logo from'../assets/logo/logo.svg'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="logo-container">
                        {/* <div className="logo-circle"></div>
                        <h2 className="logo-text">ClarityUI</h2> */}
                        <img src={logo} alt="logo" className='footer-logo'/>
                    </div>

                    <div className="social-links">
                        <a href="#" className="social-icon">
                            <Twitter size={16} />
                        </a>
                        <a href="#" className="social-icon">
                            <Facebook size={16} />
                        </a>
                        <a href="https://shorturl.at/Ynn89" className="social-icon" target='_blank'>
                            <Instagram size={16} />
                        </a>
                    </div>
                </div>

                <div className="divider"></div>

                <div className="footer-bottom">
                    <p className="copyright">"We invest in your successful property match with a service fee of 50% of the first month's rent, allowing us to provide you with personalized support every step of the way."</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;