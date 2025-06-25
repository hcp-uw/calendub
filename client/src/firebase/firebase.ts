import { initializeApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);
const auth : Auth = getAuth(app);
const provider : GoogleAuthProvider = new GoogleAuthProvider();

export { auth, provider };