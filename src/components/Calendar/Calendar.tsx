import { useState } from 'react';
import './Calendar.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CalendarEvent } from 'components';
import { Event } from 'types/Event';

interface CalendarProps {
  setSelectedEvent: (event: Event) => void;
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
  // TODO: how is this going to be structured?
  const events = [
    {
      id: 1,
      name: 'General Meeting',
      date: '2025-01-14',
      time: '6:00-7:30pm',
      location: 'MOR 220',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc.',
    },
    {
      id: 2,
      name: 'Another Event',
      date: '2025-01-14',
      time: '8:00-9:30am',
      location: 'Somewhere',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc.',
    },
    {
      id: 3,
      name: 'Event but with a Long Name',
      date: '2025-01-17',
      time: '1:00-2:30pm',
      location: 'The Quad',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc nec justo ultricies aliquam. Nullam nec fermentum nunc. Sed nec nunc.',
    },
  ];

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
              color="#ad88e8"
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
