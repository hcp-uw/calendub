import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input placeholder="Search for username..."></input>
      <button>
        <FaSearch size={14} />
      </button>
    </div>
  );
};

export default SearchBar;
