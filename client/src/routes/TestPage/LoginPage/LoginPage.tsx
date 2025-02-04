import './LoginPage.css';
import logo from 'assets/logo.png';
import sideImage from 'assets/login-image.jpg';
import googleLogo from 'assets/google-logo.png';
import uwLogo from 'assets/uw-logo.webp';
import passwordEyeShow from 'assets/password-eye-show.png';
import passwordEyeHide from 'assets/password-eye-hide.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='login-component'>
            <div className='login-component-fields'>
                <Link to='/test' className='login-component-fields-header'>
                    <img src={logo} alt="Logo" className='login-component-fields-header-logo' />
                    <h1 className='login-component-fields-header-name'>Calendub</h1>
                </Link>
                <div className='login-component-fields-form'>
                    <div className='login-component-fields-form-titles'>
                        <span className='form-title'>Welcome Back</span>
                        <span className='form-subtitle'>Please enter your details</span>
                    </div>
                    <button className='google-uw-button'>
                        <img src={googleLogo} alt="Google" className='google-icon' />
                        <div className='google-uw-button-text'>Continue with Google/UW Net ID</div>
                        <img src={uwLogo} alt="UW" className='uw-icon' />
                    </button>
                    <div className='or-separator'>
                        <hr></hr>
                            or
                        <hr></hr>
                    </div>
                    <div className="login-form-container">
                        <div className="form-field">
                            <span>Email address</span>
                            <input type="text"/>
                        </div>
                        <div className="form-field">
                            <span>Password</span>
                            <input type={showPassword? 'text' : 'password'} />
                            <div className="show-password" onClick={() => setShowPassword(!showPassword)}>
                                <img src={showPassword? passwordEyeHide : passwordEyeShow}></img>
                            </div>
                        </div>
                        <button>Log In</button>
                    </div>
                    <span>Don't have an account? <a href="/test/signup">Sign Up</a></span>
                </div>
            </div>
            <div className='login-component-image'>
                <img src={sideImage} alt="Login" className='login-component-image-image' />
            </div>
        </div>
    )
};

export default LoginPage;