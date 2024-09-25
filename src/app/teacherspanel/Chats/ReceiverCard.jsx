import React from 'react';

const ReceiverCard = ({ onReceiveCall, onEndCall, callerId }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg">
                <h2>Incoming Call...{callerId}</h2>
                <button onClick={onReceiveCall}>Answer</button>
                <h1>|</h1>
                <button onClick={onEndCall}>Reject</button>
            </div>
        </div>
    );
};

export default ReceiverCard;
