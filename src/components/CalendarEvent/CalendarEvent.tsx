import './calendarEvent.css';

interface CalendarEventProps {
  name: string;
  color: string;
}

const CalendarEvent = (props: CalendarEventProps) => {
  return (
    <div className="label" style={{ backgroundColor: props.color }}>
      {props.name}
    </div>
  );
};

export default CalendarEvent;
