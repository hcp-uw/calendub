import './calendarEvent.css';

interface CalendarEventProps {
  name: string;
  color: string;
  onClick: () => void;
}

const CalendarEvent = (props: CalendarEventProps) => {
  return (
    <div
      className="label"
      style={{ backgroundColor: props.color }}
      onClick={() => props.onClick()}
    >
      {props.name}
    </div>
  );
};

export default CalendarEvent;
