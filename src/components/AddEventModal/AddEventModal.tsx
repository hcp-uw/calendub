import { useState } from 'react';
import { Event } from 'types/Event';
import { FaLocationDot } from 'react-icons/fa6';
import { FaClock, FaHashtag } from 'react-icons/fa';
import './AddEventModal.css';

interface AddEventModalProps {
  events: Event[];
  updateEvents: (events: Event[]) => void;
  addEventRef: React.RefObject<HTMLDialogElement>;
}

const AddEventModal = (props: AddEventModalProps) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const events = props.events;
  const updateEvents = props.updateEvents;
  const addEventRef = props.addEventRef;

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
      updateEvents([
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
      addEventRef.current?.close();
    }
  };

  return (
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
            <option value="" disabled></option>
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
          <button onClick={() => addEventRef.current?.close()}>Cancel</button>
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
  );
};

export default AddEventModal;
