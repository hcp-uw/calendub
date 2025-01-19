import './Calendar.css';
import { CalendarEvent } from 'components';
import { useRef } from 'react';
import { FaClock, FaHashtag, FaPlus } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { GrTextAlignFull } from 'react-icons/gr';
import { Event } from 'types/Event';

interface CalendarProps {
  setSelectedEvent: (event: Event) => void;
  events: Event[];
  currentDate: Date;
}

const Calendar = (props: CalendarProps) => {
  const weekDayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const colors = [
    '#d39d9d',
    '#d3b49d',
    '#d2d39d',
    '#9dd3ad',
    '#9db4d3',
    '#ad9dd3',
  ];
  const eventColors: Record<string, string> = {};
  const events = props.events;
  const currentDate = props.currentDate;

  // For an event type, it returns a unique color (repeats colors if needed)
  const getColorForEvent = (eventType: string) => {
    if (!eventColors[eventType]) {
      eventColors[eventType] =
        colors[Object.keys(eventColors).length % colors.length];
    }
    return eventColors[eventType];
  };

  // Get the number of days in a month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get the day of the week for the first day of the month
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Render the calendar in a grid
  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const totalDayCells =
      daysInMonth + ((7 - ((daysInMonth + firstDay) % 7)) % 7); // Ensure complete row in grid

    // Days of the week (SUN, MON, TUE, etc.)
    for (let day = 0; day < 7; day++) {
      days.push(
        <div key={'weekDay' + day} className="calendar-cell">
          <div className="day">{weekDayNames[day]}</div>
        </div>
      );
    }

    // Days of the month
    for (let day = -firstDay + 1; day <= totalDayCells; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dateStr = date.toISOString().split('T')[0];
      const dayEvents = events.filter((event) => event.date === dateStr);

      days.push(
        <div key={'day' + day} className="calendar-cell">
          <div className="day">{day > 0 && day <= daysInMonth ? day : ''}</div>
          {dayEvents.map((event) => (
            <CalendarEvent
              key={event.id}
              name={event.name}
              color={getColorForEvent(event.type)}
              onClick={() => props.setSelectedEvent(event)}
            />
          ))}
        </div>
      );
    }

    return days;
  };

  const addEventRef = useRef(null);
  return (
    <div className="calendar">
      <div className="calendar-bar">
        <select>
          <option>Month</option>
        </select>
        <button onClick={() => addEventRef.current.showModal()}>
          <FaPlus size={8} />
          Add event
        </button>
      </div>
      <div className="calendar-grid card">{renderCalendarDays()}</div>
      <dialog ref={addEventRef} className="card">
        <div className="add-event-modal">
          <h2>Add event</h2>
          <input type="text" placeholder="Add title" />
          <span>
            <FaClock size={16} color="#282828" />
            <input type="date" />
            <input type="time" /> -
            <input type="time" />
          </span>
          <span>
            <FaLocationDot size={16} color="#282828" />
            <input type="text" placeholder="Add location" />
          </span>
          <span>
            <FaHashtag size={16} color="#282828" />
            <select>
              <option value="Test1">Test1</option>
              <option value="Test2">Test2</option>
              <option value="Test3">Test3</option>
            </select>
          </span>
          <textarea placeholder="Add description"></textarea>
          <span>
            <button onClick={() => addEventRef.current.close()}>Cancel</button>
            <button>Add</button>
          </span>
        </div>
      </dialog>
    </div>
  );
};

export default Calendar;
