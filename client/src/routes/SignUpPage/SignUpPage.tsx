import './SignUpPage.css';
import logo from 'assets/logo.png';
import sideImage from 'assets/signup-image.webp';
import googleLogo from 'assets/google-logo.png';
import uwLogo from 'assets/uw-logo.webp';
import passwordEyeShow from 'assets/password-eye-show.png';
import passwordEyeHide from 'assets/password-eye-hide.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SignUpPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='signup-component'>
            <div className='signup-component-fields'>
                <Link to='/' className='signup-component-fields-header'>
                    <img src={logo} alt="Logo" className='signup-component-fields-header-logo' />
                    <h1 className='signup-component-fields-header-name'>Calendub</h1>
                </Link>
                <div className='signup-component-fields-form'>
                    <div className='signup-component-fields-form-titles'>
                        <span className='form-title'>Get Started With Us</span>
                        <span className='form-subtitle'>Please enter your details</span>
                    </div>
                    <button className='google-uw-button'>
                        <img src={googleLogo} alt="Google" className='google-icon' />
                        <div className='google-uw-button-text'>Continue with Google/UW Net ID</div>
                        <img src={uwLogo} alt="UW" className='uw-icon' />
                    </button>
                    <div className='or-separator'>
                        <hr />
                        or
                        <hr />
                    </div>
                    <div className="signup-form-container">
                        <div className="signup-form-field">
                            <span>Name</span>
                            <input type="text" />
                        </div>
                        <div className="signup-form-field">
                            <span>Email address</span>
                            <input type="text" />
                        </div>
                        <div className="signup-form-field">
                            <span>Password</span>
                            <input type={showPassword? 'text' : 'password'} />
                            <div className="show-password" onClick={() => setShowPassword(!showPassword)}>
                                <img src={showPassword? passwordEyeHide : passwordEyeShow}></img>
                            </div>
                        </div>
                        <button>Sign Up</button>
                    </div>
                    <span>Already have an account? <a href="/test/login">Log In</a></span>
                </div>
            </div>
            <div className='signup-component-image'>
                <img src={sideImage} alt="Sign Up" className='signup-component-image-image' />
            </div>
        </div>
    );
};

export default SignUpPage;