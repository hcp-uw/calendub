import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, ExplorePage, Profile } from 'routes';
import 'App.css';

const App = () => {
  useEffect(() => {
    getEvents();
  });

  const getEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
