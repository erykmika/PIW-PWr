import React, { useRef } from 'react';

const ContactDialog = (props) => {
    const dialogRef = useRef(null);
    const textAreaRef = useRef(null);

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    const handleSubmit = () => {
        if (textAreaRef.current) {
            const userInput = textAreaRef.current.value;
            console.log('User input:', userInput);
        }
        closeDialog();
        alert("Message sent succesfully!");
    };

    return (
        <>
            <button onClick={openDialog} className="contact-btn">Contact Us</button>
            <dialog id="dialog" className="contact-dialog" ref={dialogRef}>
                <div className="form-placeholder">
                    <div className="form">
                        <div className="cross-container">
                            <div className="cross" id="cross" onClick={closeDialog}></div>
                        </div>
                        <div className="form-details">
                            <p className="form-title">Contact</p>
                            <p className="form-prompt">You're contacting the {props.hotelName} hotel</p>
                        </div>
                        <div className="form-submit-content">
                            <textarea ref={textAreaRef}></textarea>
                        </div>
                        <div className="form-buttons">
                            <button onClick={closeDialog}>Cancel</button>
                            <button className="contact-btn" onClick={handleSubmit}>
                                <span>Send</span><span></span>
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default ContactDialog;
