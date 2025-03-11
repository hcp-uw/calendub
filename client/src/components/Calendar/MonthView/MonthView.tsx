import { CalendarEvent } from 'components';
import { Event } from 'types/Event';
import './MonthView.css';

interface MonthViewProps {
  currentDate: Date;
  displayEvents: Event[];
  eventColors: Record<string, string>;
  setSelectedEvent: (event: Event, x: number, y: number) => void;
}

const weekDayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

const MonthView = ({ currentDate, displayEvents, eventColors, setSelectedEvent }: MonthViewProps) => {
  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const totalDayCells = daysInMonth + ((7 - ((daysInMonth + firstDay) % 7)) % 7); // Ensure full row

    for (let day = 0; day < 7; day++) {
      days.push(
        <div key={'weekDay' + day} className="calendar-cell">
          <div className="day">{weekDayNames[day]}</div>
        </div>
      );
    }

    for (let day = -firstDay + 1; day <= totalDayCells; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
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
              setSelectedEvent={setSelectedEvent}
              event={event}
            />
          ))}
        </div>
      );
    }

    return days;
  };

  return <>{renderCalendarDays()}</>;
};

export default MonthView;
