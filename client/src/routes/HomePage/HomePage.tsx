import './HomePage.css';
import logo from 'assets/logo.png';
import LoginButton from '../../components/LoginButton/LoginButton';

const HomePage: React.FC = () => {
  // Button handlers
  const handleLogin = () => {
    window.location.href = '/login'; // Replace with actual login URL
  };

  const handleViewCalendar = () => {
    window.location.href = '/explore'; // Replace with actual calendar URL
  };

  return (
    <div className="home-page-body">
      <div className="home-page">
        <header className="header">
          <img src={logo} alt="CalenDub Logo" className="uw-logo" />
          <h1>CalenDub</h1>
        </header>
        <div className="content">
          <p>
            View events from RSOs and Athletics at the University of Washington.
            Login to post events or view calendar to browse upcoming activities.
          </p>
        </div>
        <div className="options">
          <LoginButton />
          <button className="button" onClick={handleViewCalendar}>
            View Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
