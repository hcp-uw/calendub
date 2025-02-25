import './AddEventModal.css';
import { useState, useEffect, useRef } from 'react';
import { Organizer } from 'types/Organizer';
import defaultimage from '../../assets/defaultimage.jpg';
import { format, parseISO, set } from "date-fns";
import CreateOrganizationModal from '../CreateOrganizationModal/CreateOrganizationModal';


interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose }) => {
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [filteredOrganizers, setFilteredOrganizers] = useState<Organizer[]>([]);
  const [organizerInput, setOrganizerInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpenFR, setIsOpenFR] = useState(false);
  const [selectingOrganizer, setSelectingOrganizer] = useState(false);

  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);

  const handleCreateOrgClick = () => {
    setIsOrgModalOpen(true);
  };

  const [title, setTitle] = useState('');
  const titleInputRef = useRef<HTMLInputElement>(null);


  const roundUpToNearest30Min = (date: Date) => {
    const ms = date.getTime();
    const interval = 30 * 60 * 1000;
    return new Date(Math.ceil(ms / interval) * interval);
  };

  const defaultStartDate = roundUpToNearest30Min(new Date());
  const defaultEndDate = new Date(defaultStartDate.getTime() + 60 * 60 * 1000);

  const [startDate, setStartDate] = useState<Date>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date>(defaultEndDate);
  const [allDay, setAllDay] = useState(false);
  const [recurring, setRecurring] = useState('');
  const [endsOption, setEndsOption] = useState('never');
  const [endsAfterCount, setEndsAfterCount] = useState(1);
  const [endsOnDate, setEndsOnDate] = useState<Date>(new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000));

  const [isInPerson, setIsInPerson] = useState(false);
  const [isVirtual, setIsVirtual] = useState(false);
  const [isHybrid, setIsHybrid] = useState(false);

  const [description, setDescription] = useState('');

  const [isRSVPRequired, setIsRSVPRequired] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const fileArray: File[] = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...fileArray]);
    }
  };

  const createEventHandler = async () => {
    // add in error handling

    const formData = new FormData();
    formData.append('title', title);
    formData.append('organizer', organizerInput);
    formData.append('start', startDate.toISOString());
    formData.append('end', endDate.toISOString());
    formData.append('allDay', String(allDay));
    formData.append('recurring', recurring);
    formData.append('endsOption', endsOption);
    formData.append('endsAfterCount', String(endsAfterCount));
    formData.append('endsOnDate', endsOnDate.toISOString());
    formData.append('isInPerson', String(isInPerson));
    formData.append('isVirtual', String(isVirtual));
    formData.append('isHybrid', String(isHybrid));
    formData.append('description', description);
    formData.append('isRSVPRequired', String(isRSVPRequired));
    files.forEach((file) => formData.append('files', file));

    try {
      const response = await fetch('api/events/', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to create event');
      }
  
      const newEvent = await response.json();
      console.log('New event:', newEvent);

    } catch (error) {
      console.error('Error posting event data:', error);
    }
  };

  const updateStartDate = (date: Date) => {
    const gap = endDate.getTime() - startDate.getTime();
    setStartDate(date);
    setEndDate(new Date(date.getTime() + gap));
  }

  useEffect(() => {
    setIsOpenFR(isOpen);
    if (isOpen) {
      titleInputRef.current?.focus();
    }
    const defaultStartDate = roundUpToNearest30Min(new Date());
    const defaultEndDate = new Date(defaultStartDate.getTime() + 60 * 60 * 1000);

    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/organizers')
        .then((res) => res.json())
        .then((data) => {
          setOrganizers(data);
        })
        .catch((err) => console.error('Error fetching organizers:', err));
    }
  }, [isOpen]);

  useEffect(() => {
    if (organizerInput.trim() && !selectingOrganizer) {
      const filtered = organizers.filter((org) =>
        org.name.toLowerCase().includes(organizerInput.toLowerCase())
      );
      setFilteredOrganizers(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
    }
    setSelectingOrganizer(false);
  }, [organizerInput, organizers]);

  const handleSelectOrganizer = (organizer: string) => {
    setShowDropdown(false);
    setOrganizerInput(organizer);
    setSelectingOrganizer(true);
  };

  const handleCreateOrganizer = async (name: string, description: string, picture: File) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('picture', picture);

    try {
      const response = await fetch('api/organizers/', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to create organizer');
      }
  
      const newOrganizer = await response.json();
      setOrganizers((prevOrganizers) => [...prevOrganizers, newOrganizer]);

    } catch (error) {
      console.error('Error posting organizer data:', error);
    }

    setShowDropdown(false);
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpenFR ? 'show' : ''}`} 
      onClick={() => {
        if (!isOrgModalOpen) {
          onClose();
        } else {
          setIsOrgModalOpen(false);
        }
      }}>
      <div className={`modal-content ${isOpenFR ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <input type="text" placeholder="Add title" className='title-input' ref={titleInputRef} value={title} onChange={(e) => setTitle(e.target.value)}/>
        <div>
          <div className="organizer-input-container">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="0.5" >
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.73.73l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
            </svg>
            <input
              type="text"
              className="organizer-input"
              placeholder="Select Organizer"
              value={organizerInput}
              onChange={(e) => setOrganizerInput(e.target.value)}
            />
          </div>
          {showDropdown && (
            <div>
              <ul className="dropdown">
                {filteredOrganizers.map((org, index) => (
                  <li key={index} className="dropdown-item" onClick={() => handleSelectOrganizer(org.name)}>
                    <img
                      src={org.picture ? `http://localhost:5100${org.picture}` : defaultimage}
                      alt={org.name}
                      className="org-image"
                    />
                    <div className="org-info">
                      <span className="org-name">{org.name}</span>
                      <span className="org-description">{org.description || "No description available"}</span>
                    </div>
                </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button onClick={() => handleCreateOrgClick()} className='organizer-button'>
          Create New Organization
        </button>
        {isOrgModalOpen && <CreateOrganizationModal isOpen={isOrgModalOpen} onClose={() => setIsOrgModalOpen(false)} initialName={organizerInput} createOrganizer={handleCreateOrganizer} />}
        <div className='date-time-container'>
          {!allDay ? 
            <div className='date-container'>
              <input type="datetime-local" value={format(startDate, "yyyy-MM-dd'T'HH:mm")} onChange={(e) => updateStartDate(parseISO(e.target.value))} />
              <span>to</span>
              <input type="datetime-local" value={format(endDate, "yyyy-MM-dd'T'HH:mm")} onChange={(e) => setEndDate(parseISO(e.target.value))} />
            </div> 
            :
            <div className='date-container'>
              <input type="date" value={format(startDate, "yyyy-MM-dd")} onChange={(e) => updateStartDate(parseISO(e.target.value))} />
              <span>to</span>
              <input type="date" value={format(endDate, "yyyy-MM-dd")} onChange={(e) => setEndDate(parseISO(e.target.value))} />
            </div> 
          }
        </div>
        <div className='allday-recurring-container'>
          <label>
            All Day <input type="checkbox" checked={allDay} onChange={(e) => setAllDay(e.target.checked)}/>
          </label>
          <label>
            Recurring
            <select value={recurring} onChange={(e) => setRecurring(e.target.value)}>
              <option value="">None</option>
              <option value="daily">Every Day</option>
              <option value="weekly">Every Week</option>
              <option value="monthly">Every Month</option>
              <option value="yearly">Every Year</option>
              <option value="custom">Custom</option>
            </select>
          </label>
          {recurring !== '' &&
            <div className="ends-container">
              <label>
                Ends
                <select value={endsOption} onChange={(e) => setEndsOption(e.target.value)}>
                  <option value="never">Never</option>
                  <option value="after">After</option>
                  <option value="on">On</option>
                </select>
              </label>
              {endsOption === 'after' && (
                <div>
                  <input
                    type="number"
                    min="1"
                    value={endsAfterCount}
                    onChange={(e) => setEndsAfterCount(Number(e.target.value))}
                  />
                  <span>{endsAfterCount > 1 ? 'occurrences' : 'occurrence'}</span>
                </div>
              )}
              {endsOption === 'on' && (
                <input
                  type="date"
                  value={format(endsOnDate, "yyyy-MM-dd")}
                  onChange={(e) => setEndsOnDate(parseISO(e.target.value))}
                />
              )}
            </div>
          }
        </div>
        <div className='location-container'>
          <div className='location-type-container'>
            {!isVirtual && !isHybrid &&
              <label>
                In-Person <input type="checkbox" checked={isInPerson} onChange={() => setIsInPerson(!isInPerson)} /> 
              </label>
            } 
            {!isInPerson && !isHybrid &&
              <label>
                Virtual <input type="checkbox" checked={isVirtual} onChange={() => setIsVirtual(!isVirtual)} />
              </label>
            }
            {!isInPerson && !isVirtual &&
              <label>
                Hybrid <input type="checkbox" checked={isHybrid} onChange={() => setIsHybrid(!isHybrid)} />
              </label>
            }
          </div>
          <div className='location-input-container'>
            {isInPerson &&
              <input type="text" placeholder="Location" />
            }
            {isVirtual &&
              <input type="text" placeholder="Meeting Link" />
            }
            {isHybrid &&
              <div>
                <input type="text" placeholder="Location" />
                <input type="text" placeholder="Meeting Link" />
              </div>
            }
          </div>
        </div>
        <textarea   className="description-textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        {/* TODO: Add tags */}
        <label>
          RSVP Required?<input type="checkbox" checked={isRSVPRequired} onChange={() => setIsRSVPRequired(!isRSVPRequired)} /> 
        </label>
        {isRSVPRequired && <input type="text" placeholder="RSVP Link" />}
        <div className='file-upload'>
          <input className='file-upload-input' type="file" multiple onChange={handleFileChange}/>
        </div>
        <button onClick={createEventHandler}>Post</button>
      </div>
    </div>
  );
};

export default AddEventModal;
