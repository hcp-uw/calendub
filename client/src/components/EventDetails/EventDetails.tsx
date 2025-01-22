import './EventDetails.css';
import { Event } from 'types/Event';

interface EventDetailsProps {
  selectedEvent: Event;
  eventColors: Record<string, string>;
}

const EventDetails = (props: EventDetailsProps) => {
  // You can use eventColors to get the color corresponding to the event type
  // e.g. eventColors[props.selectedEvent.type]

  return (
    <div className="event-details card">
      <h2>{props.selectedEvent.name}</h2>
      <h4>{props.selectedEvent.time}</h4>
      <p>{props.selectedEvent.type}</p>
      <p>{props.selectedEvent.location}</p>
      <p>{props.selectedEvent.description}</p>
    </div>
  );
};

export default EventDetails;
