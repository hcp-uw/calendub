import './Header.css';
import logo from 'assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import defaultprofile from 'assets/default-profile.jpg';
const Header = () => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className='header'>
            <Link to='/test' className='header-branding'>
                <img src={logo} alt="Logo" className='header-branding-logo' />
                <h1 className='header-branding-name'>Calendub</h1>
            </Link>
            {loggedIn ? 
                <div className='header-profile-view' >
                    <div onClick={() => setShowDropdown(!showDropdown)}>
                        <img src={defaultprofile} alt='defaultprofile' className='default-profile-image' />
                        {showDropdown && (
                            <div className='dropdown-menu'>
                                <div>Profile</div>
                                <div>Log Out</div>
                            </div>
                        )}
                    </div>
                </div>
            :
            <div className='header-cta'>
                <button onClick={() => navigate('/test/login')} className='header-cta-login'>Log In</button>
                <button onClick={() => navigate('/test/signup')} className='header-cta-signup'>Sign Up</button>
            </div>
            }   
        </div>
    );
};

export default Header;
