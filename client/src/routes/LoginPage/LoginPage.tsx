import './LoginPage.css';
import logo from 'assets/logo.png';
import sideImage from 'assets/login-image.jpg';
import passwordEyeShow from 'assets/password-eye-show.png';
import passwordEyeHide from 'assets/password-eye-hide.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import GoogleLoginButton from 'components/GoogleLoginButton/GoogleLoginButton';
import { auth } from "../../firebase/firebase.ts";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogIn = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted:', { email, password });

        if (!email || !password) {
            alert('Please fill out all fields');
            return;
        }

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;
            const token = await user.getIdToken();

            console.log('Logged in user:', user);

            await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            navigate('/explore');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='login-component'>
            <div className='login-component-fields'>
                <Link to='/' className='login-component-fields-header'>
                    <img src={logo} alt="Logo" className='login-component-fields-header-logo' />
                    <h1 className='login-component-fields-header-name'>Calendub</h1>
                </Link>
                <div className='login-component-fields-form'>
                    <div className='login-component-fields-form-titles'>
                        <span className='form-title'>Welcome Back</span>
                        <span className='form-subtitle'>Please enter your details</span>
                    </div>
                    <GoogleLoginButton />
                    <div className='or-separator'>
                        <hr></hr>
                            or
                        <hr></hr>
                    </div>
                    <div className="login-form-container">
                        <div className="form-field">
                            <span>Email address</span>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-field">
                            <span>Password</span>
                            <input type={showPassword? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <div className="show-password" onClick={() => setShowPassword(!showPassword)}>
                                <img src={showPassword? passwordEyeHide : passwordEyeShow}></img>
                            </div>
                        </div>
                        <button onClick={handleLogIn}>Log In</button>
                    </div>
                    <span>Don't have an account? <a href="/signup">Sign Up</a></span>
                </div>
            </div>
            <div className='login-component-image'>
                <img src={sideImage} alt="Login" className='login-component-image-image' />
            </div>
        </div>
    )
};

export default LoginPage;