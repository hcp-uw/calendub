import { useState, useEffect } from 'react';
import {
  Header,
  Calendar,
  EventDetails,
  PageHeader,
  CalendarHeader,
} from 'components';
import { Event } from 'types/Event';
import 'App.css';

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const updateCurrentDate = (newCurrentDate: Date) => {
    setCurrentDate(newCurrentDate);
  };

  useEffect(() => {
    getEvents();
  });

  const getEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data  = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // TODO: How will this be structured?
  // Test events => feel free to change the values for testing
  // date and time field NOT FINAL => need to account for timezones (unless it's worked out in the backend)
  const testEvents = [
    {
      id: 0,
      name: 'General Meeting',
      date: '2025-01-14',
      time: '6:00-7:30pm',
      location: 'MOR 220',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc.',
      type: 'Club Meeting',
    },
    {
      id: 1,
      name: 'General Meeting',
      date: '2025-01-21',
      time: '6:00-7:30pm',
      location: 'MOR 220',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc.',
      type: 'Club Meeting',
    },
    {
      id: 2,
      name: 'Another Event',
      date: '2025-01-14',
      time: '8:00-9:30am',
      location: 'Somewhere',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc.',
      type: 'Some type',
    },
    {
      id: 3,
      name: 'Event but with a Long Name',
      date: '2025-01-17',
      time: '1:00-2:30pm',
      location: 'The Quad',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc.',
      type: 'Another type',
    },
    {
      id: 4,
      name: 'Some other event',
      date: '2025-01-23',
      time: '6:30-8:00pm',
      location: 'Somehwhere',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc.',
      type: 'Type',
    },
    {
      id: 5,
      name: 'UW v Purdue',
      date: '2025-01-15',
      time: '6:30pm',
      location: 'Hec Edmundson Pavilion',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc.',
      type: 'Sports Match',
    },
    {
      id: 6,
      name: 'UW event',
      date: '2025-01-23',
      time: '4:30-5:00pm',
      location: 'Red Square',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc.',
      type: 'UW Event',
    },
  ];

  return (
    <div className="app">
      {/** This is a 2x2 grid layout
       * According to the current Figma design, the layout is as follows:
       * (Header)        | (CalendarHeader, SearchBar, Profile)
       * ________________|______________________________________
       * (PageHeader)    | (Calendar)
       * (EventDetails)  |
       */}
      <div className="grid">
        <Header />
        <CalendarHeader
          currentDate={currentDate}
          updateCurrentDate={updateCurrentDate}
        />
        <div className="sidebar">
          <PageHeader />
          {selectedEvent && <EventDetails selectedEvent={selectedEvent} />}
        </div>
        <Calendar
          setSelectedEvent={setSelectedEvent}
          events={testEvents}
          currentDate={currentDate}
        />
      </div>
    </div>
  );
};

export default App;
