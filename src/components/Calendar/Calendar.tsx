import './Calendar.css';
import { CalendarEvent } from 'components';
import { useRef, useState } from 'react';
import { FaClock, FaHashtag, FaPlus } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
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
  const [events, setEvents] = useState(props.events);
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

  const addEvent = (
    title: string,
    date: string,
    startTime: string,
    endTime: string,
    location: string,
    description: string,
    type: string
  ) => {
    if (
      title !== '' &&
      date !== '' &&
      startTime !== '' &&
      endTime !== '' &&
      location !== '' &&
      description !== '' &&
      type !== ''
    ) {
      setEvents([
        ...events,
        {
          id: events.length,
          name: title,
          date: date,
          time: `${startTime}-${endTime}`,
          location: location,
          type: type,
          description: description,
        },
      ]);
      setTitle('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setLocation('');
      setType('');
      setDescription('');
      addEventRef.current.close();
    }
  };

  const addEventRef = useRef(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
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
          <input
            type="text"
            placeholder="Add title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span>
            <FaClock size={16} color="#282828" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            -
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </span>
          <span>
            <FaLocationDot size={16} color="#282828" />
            <input
              type="text"
              placeholder="Add location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </span>
          <span>
            <FaHashtag size={16} color="#282828" />
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Test1">Test1</option>
              <option value="Test2">Test2</option>
              <option value="Test3">Test3</option>
            </select>
          </span>
          <textarea
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <span>
            <button onClick={() => addEventRef.current.close()}>Cancel</button>
            <button
              onClick={() =>
                addEvent(
                  title,
                  date,
                  startTime,
                  endTime,
                  location,
                  description,
                  type
                )
              }
            >
              Add
            </button>
          </span>
        </div>
      </dialog>
    </div>
  );
};

export default Calendar;
