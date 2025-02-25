import './CreateOrganizationModal.css';
import React, { useEffect, useState } from 'react';

interface CreateOrganizationModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialName: string;
    createOrganizer(name: string, description: string, picture: File): void;
}

const CreateOrganizationModal : React.FC<CreateOrganizationModalProps> = ({ isOpen, onClose, initialName, createOrganizer }) => {
    const [name, setName] = useState('');
    const [picture, setPicture] = useState<File | null>(null);
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(initialName);
      }, [initialName]);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setPicture(e.target.files[0]);
      }
    };
  
    const handleSubmit = () => {
      if (!name) {
        alert('Name is required');
        return;
      }
      if (!description) {
        alert('Description is required');
        return;
      }
      if (!picture) {
        alert('Picture is required');
        return
      }
      createOrganizer(name, description, picture);
      onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={`org-modal-overlay ${isOpen ? 'show' : ''}`}>
          <div className={`org-modal-content ${isOpen ? 'show' : ''}`}>
            <button className="org-modal-close-button" onClick={onClose}>&times;</button>
            <input
              className='name-input'
              type="text"
              placeholder="Organizer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              className='description-input'
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className='org-file-upload'>
              <input type="file" className="org-file-upload-input" onChange={handleFileChange} />
            </div>
            <button onClick={handleSubmit}>Create</button>
          </div>
        </div>
    );
}

export default CreateOrganizationModal;
