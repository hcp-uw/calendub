import './Calendar.css';
import { CalendarEvent, AddEventModal, CalendarHeader } from 'components';
import { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Event } from 'types/Event';

interface CalendarProps {
  setSelectedEvent: (event: Event) => void;
  updateCurrentDate: (date: Date) => void;
  events: Event[];
  displayEvents: Event[];
  eventColors: Record<string, string>;
  updateEvents: (events: Event[]) => void;
  currentDate: Date;
}

const Calendar = (props: CalendarProps) => {
  const weekDayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const currentDate = props.currentDate;
  const eventColors = props.eventColors;
  const displayEvents = props.displayEvents;
  const events = props.events;
  const updateEvents = props.updateEvents;

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
      const dayEvents = displayEvents.filter((event) => event.date === dateStr);
      days.push(
        <div key={'day' + day} className="calendar-cell">
          <div className="day">{day > 0 && day <= daysInMonth ? day : ''}</div>
          {dayEvents.map((event) => (
            <CalendarEvent
              key={event.id}
              name={event.name}
              color={eventColors[event.type]}
              onClick={() => props.setSelectedEvent(event)}
            />
          ))}
        </div>
      );
    }

    return days;
  };

  const addEventRef = useRef<HTMLDialogElement>(null);
  return (
    <div className="calendar">
      <div className="calendar-bar">
        <CalendarHeader
          currentDate={currentDate}
          updateCurrentDate={props.updateCurrentDate}
        />
        <div className="calendar-options">
          <select>
            <option>Month</option>
          </select>
          <button onClick={() => addEventRef.current?.showModal()}>
            <FaPlus size={8} />
            Add event
          </button>
        </div>
      </div>
      <div className="calendar-grid card">{renderCalendarDays()}</div>
      <AddEventModal
        addEventRef={addEventRef}
        events={events}
        updateEvents={updateEvents}
        eventColors={eventColors}
      />
    </div>
  );
};

export default Calendar;
