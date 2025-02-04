import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, ExplorePage, TestPage, LoginPage2, SignUpPage } from 'routes';
import 'App.css';
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/test/login" element={<LoginPage2 />} />
          <Route path='/test/signup' element={<SignUpPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
