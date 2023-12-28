'use client'
import React, { useState } from 'react';
import '../styles/modal.css';
export default function Modal() {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    }

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            <button className='btn-modal' onClick={toggleModal}>
                Open Modal
            </button>
            {modal && (<div className='modal'>
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <h2>Player Pic</h2>
                    <h2>Player name</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto qui asperiores, maiores culpa, delectus amet iure, iusto mollitia esse ex temporibus. Iste, amet rerum. Iure deleniti eius numquam architecto accusantium!</p>
                    <button onClick={toggleModal} className='close-modal'>Close</button>
                </div>
            </div>)}

        </>
    );
}