import { useState } from 'react';
import { Calendar, EventDetails } from 'components';
import { Event } from 'types/Event';
import 'App.css';

const App = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="app">
      {selectedEvent && <EventDetails selectedEvent={selectedEvent} />}
      <Calendar setSelectedEvent={setSelectedEvent} />
    </div>
  );
};

export default App;
