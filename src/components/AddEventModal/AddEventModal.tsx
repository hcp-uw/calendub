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

interface NewEvent {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: string;
  description: string;
}

const AddEventModal = (props: AddEventModalProps) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    type: '',
    description: '',
  });

  const events = props.events;
  const updateEvents = props.updateEvents;
  const addEventRef = props.addEventRef;

  const addEvent = (event: NewEvent) => {
    if (
      event.title !== '' &&
      event.date !== '' &&
      event.startTime !== '' &&
      event.endTime !== '' &&
      event.location !== '' &&
      event.description !== '' &&
      event.type !== ''
    ) {
      updateEvents([
        ...events,
        {
          id: events.length,
          name: event.title,
          date: event.date,
          time: `${event.startTime}-${event.endTime}`,
          location: event.location,
          type: event.type,
          description: event.description,
        },
      ]);

      setNewEvent({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        type: '',
        description: '',
      });

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
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <span>
          <FaClock size={16} color="#282828" />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <input
            type="time"
            value={newEvent.startTime}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          -
          <input
            type="time"
            value={newEvent.endTime}
            onChange={(e) =>
              setNewEvent({ ...newEvent, endTime: e.target.value })
            }
          />
        </span>
        <span>
          <FaLocationDot size={16} color="#282828" />
          <input
            type="text"
            placeholder="Add location"
            value={newEvent.location}
            onChange={(e) =>
              setNewEvent({ ...newEvent, location: e.target.value })
            }
          />
        </span>
        <span>
          <FaHashtag size={16} color="#282828" />
          <select
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
          >
            <option value="" disabled></option>
            <option value="Test1">Test1</option>
            <option value="Test2">Test2</option>
            <option value="Test3">Test3</option>
          </select>
        </span>
        <textarea
          placeholder="Add description"
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
        ></textarea>
        <span>
          <button onClick={() => addEventRef.current?.close()}>Cancel</button>
          <button onClick={() => addEvent(newEvent)}>Add</button>
        </span>
      </div>
    </dialog>
  );
};

export default AddEventModal;
