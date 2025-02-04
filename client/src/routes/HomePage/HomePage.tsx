import './HomePage.css';
import logo from 'assets/logo.png';
import Header from '../../components/Header/Header';

const HomePage: React.FC = () => {

  const handleViewCalendar = () => {
    window.location.href = '/explore';
  };

  return (
    <div>
      <Header />
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
            <button className="button" onClick={handleViewCalendar}>
              View Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
