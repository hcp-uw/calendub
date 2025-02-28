import { MouseEvent, useState } from 'react';
import './calendarEvent.css';

interface CalendarEventProps {
  name: string;
  color: string;
  onClick: () => void;
}

const CalendarEvent = (props: CalendarEventProps) => {
  const [popup, setPopup] = useState({
    show: false,
    x: 0,
    y: 0,
    content: '',
  });

  const closePopup = () => {
    setPopup({ ...popup, show: false });
  };

  const test = (e: MouseEvent<HTMLElement>) => {
    const loc = e.currentTarget.getBoundingClientRect();
    console.log(loc);
    setPopup({
      show: true,
      x: loc.x + loc.width / 2,
      y: loc.y + loc.height * 1.5,
      content: 'This is a test popup',
    });
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
      {popup.show && (
        <div
          style={{
            left: popup.x,
            top: popup.y,
          }}
          className="popup card"
        >
          {popup.content}
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </>
  );
};

export default CalendarEvent;
