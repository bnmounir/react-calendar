import React from 'react';
import ReactModal from 'react-modal';
import './styles.css';
import CreateEventForm from '../CreateEventForm';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('#root');

const Modal = ({ handleToggle, isOpen }) => {
    return (
        <div>
            <ReactModal
                isOpen={isOpen}
                contentLabel='onRequestClose Example'
                onRequestClose={handleToggle}
                className='Modal'
                overlayClassName='Overlay'
            >
                <CreateEventForm />
            </ReactModal>
        </div>
    );
};

export default Modal;
