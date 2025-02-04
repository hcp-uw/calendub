import './SignUpPage.css';
import logo from 'assets/logo.png';
import sideImage from 'assets/signup-image.webp';
import passwordEyeShow from 'assets/password-eye-show.png';
import passwordEyeHide from 'assets/password-eye-hide.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import GoogleLoginButton from 'components/GoogleLoginButton/GoogleLoginButton';
import { auth } from "../../firebase/firebase.ts";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted:', { name, email, password });

        if (!name || !email || !password) {
            alert('Please fill out all fields');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }
        
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;
            const token = await user.getIdToken();
            console.log(token);

            fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(text || `Server responded with status: ${response.status}`);
                    });
                }
            })
            .then((data) => {
                console.log('Success - user logged in:', data);
            })
            .catch((error) => {
                console.error(error);
            });

            navigate('/explore');
        } catch(error) {
            console.error(error);
        }
    }

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
                    <GoogleLoginButton />
                    <div className='or-separator'>
                        <hr />
                        or
                        <hr />
                    </div>
                    <div className="signup-form-container">
                        <div className="signup-form-field">
                            <span>Name</span>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="signup-form-field">
                            <span>Email address</span>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="signup-form-field">
                            <span>Password</span>
                            <input type={showPassword? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div className="show-password" onClick={() => setShowPassword(!showPassword)}>
                                <img src={showPassword? passwordEyeHide : passwordEyeShow}></img>
                            </div>
                        </div>
                        <button onClick={handleSignUp}>Sign Up</button>
                    </div>
                    <span>Already have an account? <a href="/login">Log In</a></span>
                </div>
            </div>
            <div className='signup-component-image'>
                <img src={sideImage} alt="Sign Up" className='signup-component-image-image' />
            </div>
        </div>
    );
};

export default SignUpPage;