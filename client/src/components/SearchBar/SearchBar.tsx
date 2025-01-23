import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

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
    setActiveIndex(-1);
  };

  useEffect(() => {
    handleSearchClick();
  }, [searchValue]);

  const handleOutsideClick = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.relatedTarget?.classList.contains('suggestion-item')) {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  const handleSearchClick = () => {
    if (usernames.includes(searchValue)) {
      navigate(`/profile/${searchValue}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
        break;
      case 'Enter':
        if (activeIndex >= 0) {
          handleSuggestionClick(filteredSuggestions[activeIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const suggestionsRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

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
          onKeyDown={handleKeyPress}
        ></input>
        <button onClick={handleSearchClick}>
          <FaSearch size={14} />
        </button>
      </div>
      {showSuggestions && searchValue && filteredSuggestions.length > 0 && (
        <div className="suggestions-list" ref={suggestionsRef}>
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`suggestion-item ${
                index === activeIndex ? 'active' : ''
              }`}
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
