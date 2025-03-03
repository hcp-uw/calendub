import './EventDetails.css';
import { Event } from 'types/Event';

interface EventDetailsProps {
  closeEventDetailsPopup: () => void;
  selectedEvent: Event;
  eventColors: Record<string, string>;
}

const EventDetails = (props: EventDetailsProps) => {
  return (
    <div className="event-details card">
      <h2>{props.selectedEvent.name}</h2>
      <h4>{props.selectedEvent.time}</h4>
      <p>{props.selectedEvent.type}</p>
      <p>{props.selectedEvent.location}</p>
      <p>{props.selectedEvent.description}</p>
      <button onClick={props.closeEventDetailsPopup}>Close</button>
    </div>
  );
};

export default EventDetails;
