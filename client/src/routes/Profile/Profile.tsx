// Project structure thoughts:
// Perhaps merge this into one big CalendarPage that can be used for both ExplorePage and ProfilePage???
// It shares a lot of similarities...

import { useEffect, useState, createContext } from 'react';
import { useParams } from 'react-router-dom';
import '../ExplorePage/ExplorePage.css';
import { Event } from 'types/Event';
import {
  Header,
  Calendar,
  EventDetails,
  CalendarHeader,
  ProfileCard,
} from 'components';

export const userInformationContext = createContext<string[]>([]);

const Profile = () => {
  const { username } = useParams();

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
      author: 'hcp.uw',
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
      author: 'hcp.uw',
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
      author: 'joeschmoe',
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
      author: 'joeschmoe',
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
      author: 'janedoe',
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
      author: 'uofwa',
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
      author: 'uofwa',
    },
  ];
  const testUsers = [
    {
      username: 'hcp.uw',
      name: 'Husky Coding Project',
      image: 'https://avatars.githubusercontent.com/u/87393150',
      bio: 'Husky Coding Project is a student club that aims to provide students with practical, team-based programming experience by organizing large-scale coding projects.',
      socials: {
        instagram: 'hcp.uw',
        url: 'https://hcp-uw.vercel.app/',
      },
    },
    {
      username: 'uofwa',
      name: 'University of Washington',
      image:
        'https://img.ctykit.com/cdn/wa-bellevue/images/tr:w-900/8_16_17_member_university_of_washington.png',
      bio: 'Do you dare to Be Boundless? At the UW, you can. Share your view of the UW with #YouW.',
      socials: {
        instagram: 'uofwa',
        url: 'https://linktr.ee/uofwa',
      },
    },
  ];
  const userList = testUsers.map((user) => user.username);

  const [events, setEvents] = useState<Event[]>(testEvents);
  const [displayEvents, setDisplayEvents] = useState<Event[]>(events);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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

  useEffect(() => {
    setSelectedEvent(null);
    filterEvents('author', username as string);
  }, [username]);

  if (!userList.includes(username as string)) {
    return <div>404: username not found</div>;
  }

  return (
    <userInformationContext.Provider value={userList}>
      <div className="explore-page">
        <div className="grid">
          <Header />
          <CalendarHeader
            currentDate={currentDate}
            updateCurrentDate={updateCurrentDate}
          />
          <div className="sidebar">
            <ProfileCard
              userInformation={testUsers.find(
                (user) => user.username === username
              )}
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
    </userInformationContext.Provider>
  );
};

export default Profile;
