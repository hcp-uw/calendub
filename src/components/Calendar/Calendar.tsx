import { useState } from 'react';
import './Calendar.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CalendarEvent } from 'components';

const Calendar = () => {
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
      days.push(
        <div key={'day' + day} className="calendar-cell">
          <div className="day">{day > 0 && day <= daysInMonth ? day : ''}</div>
          <CalendarEvent name="Super Long Event Name" color="#ad88e8" />
          <CalendarEvent name="Event Name" color="#67ad88" />
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
      <div className="calendar-grid">{renderCalendarDays()}</div>
    </div>
  );
};

export default Calendar;
