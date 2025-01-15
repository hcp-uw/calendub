import { useState } from 'react';
import './Calendar.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CalendarEvent } from 'components';
import { Event } from 'types/Event';

interface CalendarProps {
  setSelectedEvent: (event: Event) => void;
  events: Event[];
}

const Calendar = (props: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
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

  const getColorForEvent = (eventType: string) => {
    if (!eventColors[eventType]) {
      eventColors[eventType] =
        colors[Object.keys(eventColors).length % colors.length];
    }
    return eventColors[eventType];
  };

  const events = props.events;

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const totalDayCells =
      daysInMonth + ((7 - ((daysInMonth + firstDay) % 7)) % 7);

    for (let day = 0; day < 7; day++) {
      days.push(
        <div key={'weekDay' + day} className="calendar-cell">
          <div className="day">{weekDayNames[day]}</div>
        </div>
      );
    }

    for (let day = -firstDay + 1; day <= totalDayCells; day++) {
      // TODO: account for time zones
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

  const changeMonth = (increment: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1)
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button onClick={() => changeMonth(-1)}>
            <FaChevronLeft size={14} />
          </button>
          <button onClick={() => changeMonth(1)}>
            <FaChevronRight size={14} />
          </button>
        </div>
        <div>
          <h1>{monthNames[currentDate.getMonth()]}</h1>
          <h3>{currentDate.getFullYear()}</h3>
        </div>
      </div>
      <div className="calendar-grid card">{renderCalendarDays()}</div>
    </div>
  );
};

export default Calendar;
