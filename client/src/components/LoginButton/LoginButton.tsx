import React from 'react';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase.ts";

const LoginButton: React.FC = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success - user logged in:', data);
      })
      .catch((error) => {
        console.error(error);
      });

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button onClick={handleLogin}>Login</button>
  );
};

export default LoginButton;
