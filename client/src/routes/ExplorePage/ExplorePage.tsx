import { useState } from 'react';
import {
  Header,
  Calendar,
  EventDetails,
  PageHeader,
  CalendarHeader,
} from 'components';
import { Event } from 'types/Event';
import './ExplorePage.css';

const ExplorePage = () => {
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
      type: 'Some other type',
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

  const [events, setEvents] = useState<Event[]>(testEvents); // actual events kept in state
  const [displayEvents, setDisplayEvents] = useState<Event[]>(events); // what events are displayed on the calendar (this is to allow filtering without losing the original events)
  const [currentDate, setCurrentDate] = useState(new Date()); // the current date being viewed on the calendar (used for month navigation)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // the current event selected by the user

  // Filter events by field and value, and sets events to the filtered events
  // e.g. (field: 'type', value: 'Club Meeting') => only show club meetings
  // e.g. (field: 'username', value: 'hcp.uw') => only show events by hcp.uw
  // e.g. (field: 'location', value: 'MOR 220') => only show events at MOR 220
  const filterEvents = (field: keyof Event, value: string) => {
    resetFilters();
    setDisplayEvents(events.filter((event) => event[field] === value));
  };

  // Reset the filter to show all events
  const resetFilters = () => {
    setDisplayEvents(events);
  };

  // Update events with new events (used for adding, deleting, and updating events)
  // e.g. (newEvents: [event1, event2, event3]) => set events to [event1, event2, event3]
  const updateEvents = (newEvents: Event[]) => {
    setEvents(newEvents);
    setDisplayEvents(newEvents);
  };

  // Updates the current date (to navigate the calendar)
  const updateCurrentDate = (newCurrentDate: Date) => {
    setCurrentDate(newCurrentDate);
  };

  // Hardcoded event types/colors for now
  const eventColors = {
    'Club Meeting': '#d39d9d',
    'Some type': '#d3b49d',
    'Another type': '#d2d39d',
    'Some other type': '#9dd3ad',
    'Sports Match': '#9db4d3',
    'UW Event': '#ad9dd3',
  };

  return (
    <div className="explore-page">
      <div className="grid">
        <Header />
        <CalendarHeader
          currentDate={currentDate}
          updateCurrentDate={updateCurrentDate}
        />
        <div className="sidebar">
          <PageHeader
            filterEvents={filterEvents}
            resetFilters={resetFilters}
            eventColors={eventColors}
          />
          {selectedEvent && (
            <EventDetails
              selectedEvent={selectedEvent}
              eventColors={eventColors}
            />
          )}
        </div>
        <Calendar
          setSelectedEvent={setSelectedEvent}
          events={events}
          updateEvents={updateEvents}
          displayEvents={displayEvents}
          eventColors={eventColors}
          currentDate={currentDate}
        />
      </div>
    </div>
  );
};

export default ExplorePage;
