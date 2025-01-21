import './PageHeader.css';

const PageHeader = () => {
  return (
    <div className = "block">
      <div className = "page-header card">
        <h2>Explore</h2>
        <p> Discover the most liked and anticipated events of the month!</p>
        <br></br>
        <p> Popular tags</p>
        <div>
          <button className = "filter"> testing </button>
          
          <button className = "filter"> testing2 </button>
          <button className = "filter"> testing3 </button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
