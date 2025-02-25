/*import { useEffect } from 'react';
import { Event } from 'types/Event';
import './PageHeader.css';

interface PageHeaderProps {
  filterEvents: (field: keyof Event, value: string) => void;
  resetFilters: () => void;
  eventColors: Record<string, string>;
}

const PageHeader = (props: PageHeaderProps) => {
  const filterEvents = props.filterEvents;
  const resetFilters = props.resetFilters;
  const eventColors = props.eventColors;
  const eventTypes = Object.keys(eventColors);

  useEffect(() => {
    // This is how filterEvents works (uncomment to see it in action)
    // Use this function to implement filters for types
    // filterEvents('type', 'Club Meeting');
    //
    // Reset filters to show all events with this
    // resetFilters();
    //
    // console.log(eventColors);
    // console.log(eventTypes);

  }, [eventTypes]);

  function Explore() {
    const [selectedTag, setSelectedTag] = useState('');

    const handleTagChange = (event) => {
      setSelectedTag(event.target.value); 
    };
    
  }

  return (
    <div className="block">
      <div className="page-header card">
        <h2>Explore</h2>
        <p>Discover the most liked and anticipated events of the month!</p>
        <br />
        <p>Explore and filter for different events using tags!</p>
        <div>
          <label htmlFor="Tags">Choose a tag type!</label>
          <select name="Tags" id="Tags">
            <option value="event_type">Event Type</option>
            <option value="location">Location</option>
            <option value="club">Club</option>
          </select>


          {selectedTag == 'event_type' && (
          /* Changed className from "button" to "button-container" */
          /*
          <div className="button-container">
            <button className="sports">Sports</button>
            <button className="club-meeting">Club Meeting</button>
            <button className="HFS">HFS</button>
          </div>
          )}

          {selectedTag == 'location' && (
          <div className="location-button">
            <button className="HUB">HUB</button>
            <button className="CSE2">CSE 2</button>
            <button className="CSE1">CSE 1</button>
          </div>
          )}

          {selectedTag == 'club' && (
          <div className="affiliation-button">
            <button className="Allen School">Allen School</button>
            <button className="Foster">Foster</button>
            <button className="Information School">Information School</button>
          </div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default PageHeader;
*/


import React, { useState, useEffect } from 'react';
//import { Event } from 'types/Event';
import './PageHeader.css';

interface PageHeaderProps {
  filterEvents: (type: string, value: string) => void;
  resetFilters: () => void;
  eventColors: { [key: string]: string };
}

const PageHeader = (props: PageHeaderProps) => {
  const { filterEvents, resetFilters, eventColors } = props;
  const [selectedTag, setSelectedTag] = useState<string>(''); // State for dropdown selection
  const eventTypes = Object.keys(eventColors); // Assuming eventColors holds event types

  // Effect to handle initial setup
  useEffect(() => {

      // This is how filterEvents works (uncomment to see it in action)
      // Use this function to implement filters for types
       filterEvents('type', 'Club Meeting');
      //
      // Reset filters to show all events with this
       resetFilters();
      //
      // console.log(eventColors);
      // console.log(eventTypes);

    console.log(eventColors);
    console.log(eventTypes);
  }, [eventTypes]); // Runs when eventTypes changes

  // Handle dropdown change to filter events
  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value); // Update state based on dropdown selection
  };

  // Handle button click and apply filters based on selected tag and value
  const handleButtonClick = (type: string, value: string) => {
    filterEvents(type, value); // Filter events based on type and value
  };

  return (
    <div className="block">
      <div className="page-header card">
        <h2>Explore</h2>
        <p>Discover the most liked and anticipated events of the month!</p>
        <br />
        <p>Explore and filter for different events using tags!</p>

        <div className = "choose_tag">
          <label htmlFor="Tags">Choose a tag type!</label>
          <select name="Tags" id="Tags" onChange={handleTagChange}>
            <option value="">--Select--</option>
            <option value="event_type">Event Type</option>
            <option value="location">Location</option>
            <option value="club">Club</option>
          </select>

          {/* Event Type Buttons */}
          {selectedTag === 'event_type' && (
            <div className="button-container">
              <button
                className="sports"
                onClick={() => handleButtonClick('type', 'Sports')}>Sports
              </button>
              <button
                className="club-meeting"
                onClick={() => handleButtonClick('type', 'Club Meeting')}>Club Meeting
              </button>
              <button className="HFS" onClick={() => handleButtonClick('type', 'HFS')}>HFS
              </button>
            </div>
          )}

          {/* Location Buttons */}
          {selectedTag === 'location' && (
            <div className="location-button">
              <button className="HUB" onClick={() => handleButtonClick('location', 'HUB')}>HUB
              </button>
              <button className="CSE2" onClick={() => handleButtonClick('location', 'CSE 2')}>CSE 2
              </button>
              <button className="CSE1" onClick={() => handleButtonClick('location', 'CSE 1')}>CSE 1
              </button>
            </div>
          )}

          {/* Club Buttons */}
          {selectedTag === 'club' && (
            <div className="affiliation-button">
              <button
                className="Allen School"
                onClick={() => handleButtonClick('club', 'Allen School')}>Allen School
              </button>
              <button className="Foster" onClick={() => handleButtonClick('club', 'Foster')}>Foster
              </button>
              <button
                className="Information School"
                onClick={() => handleButtonClick('club', 'Information School')}>Information School
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

