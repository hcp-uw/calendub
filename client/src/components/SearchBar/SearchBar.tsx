import { ChangeEvent, FocusEvent, useRef, useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Hardcoded values for now
  const usernames = [
    'hcp.uw',
    'uofwa',
    'user',
    'johndoe',
    'janedoe',
    'testuser',
    'joeschmoe',
    'janesmith',
  ];

  const filteredSuggestions = usernames.filter((item) =>
    item.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    setShowSuggestions(false);
  };

  const handleOutsideClick = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.relatedTarget?.classList.contains('suggestion-item')) {
      setShowSuggestions(false);
    }
  };
  const suggestionsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for username..."
          value={searchValue}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleOutsideClick}
        ></input>
        <button>
          <FaSearch size={14} />
        </button>
      </div>
      {showSuggestions && searchValue && filteredSuggestions.length > 0 && (
        <div className="suggestions-list" ref={suggestionsRef}>
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
              tabIndex={0}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
