import './EventDetails.css';
import { Event } from 'types/Event';

interface EventDetailsProps {
  selectedEvent: Event;
}

const EventDetails = (props: EventDetailsProps) => {
  return (
    <div className="event-details card">
      <h2>{props.selectedEvent.name}</h2>
      <h4>{props.selectedEvent.time}</h4>
      <p>{props.selectedEvent.location}</p>
      <p>{props.selectedEvent.description}</p>
    </div>
  );
};

export default EventDetails;
