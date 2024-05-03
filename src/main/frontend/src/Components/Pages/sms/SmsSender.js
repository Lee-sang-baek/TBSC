import React, { useState } from 'react';
import axios from 'axios';

function SmsSender() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const sendSMS = () => {
        axios.post('/api/send-sms', { to: phoneNumber, body: message })
            .then(response => alert('SMS sent successfully!'))
            .catch(error => alert('Failed to send SMS: ' + error.message));
    };

    return (
        <div>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
            />
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message"
            />
            <button onClick={sendSMS}>Send SMS</button>
        </div>
    );
}

export default SmsSender;
