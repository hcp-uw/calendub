import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './CalendarHeader.css';

interface CalendarHeaderProps {
  currentDate: Date;
  updateCurrentDate: (date: Date) => void;
}

const CalendarHeader = (props: CalendarHeaderProps) => {
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
  const currentDate = props.currentDate;
  const updateCurrentDate = props.updateCurrentDate;

  // Changes the current month based on the increment (1 or -1)
  const changeMonth = (increment: number) => {
    updateCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1)
    );
  };
  return (
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
  );
};

export default CalendarHeader;
