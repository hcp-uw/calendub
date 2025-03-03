import { MouseEvent } from 'react';
import './calendarEvent.css';
import { Event } from 'types/Event';

interface CalendarEventProps {
  name: string;
  color: string;
  setSelectedEvent: (event: Event, x: number, y: number) => void;
  event: Event;
}

const CalendarEvent = (props: CalendarEventProps) => {
  const test = (e: MouseEvent<HTMLElement>) => {
    const loc = e.currentTarget.getBoundingClientRect();
    props.setSelectedEvent(
      props.event,
      loc.x + loc.width / 2,
      loc.y + loc.height * 1.5
    );
  };

  return (
    <>
      <div
        className="label"
        style={{ backgroundColor: props.color }}
        onClick={test}
      >
        {props.name}
      </div>
    </>
  );
};

export default CalendarEvent;
