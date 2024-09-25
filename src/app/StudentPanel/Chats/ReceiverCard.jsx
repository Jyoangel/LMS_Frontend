import React from 'react';

const ReceiverCard = ({ onReceiveCall, onEndCall }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg">
                <h2>Incoming Call...</h2>
                <button onClick={onReceiveCall}>Answer</button>
                <button onClick={onEndCall}>Reject</button>
            </div>
        </div>
    );
};

export default ReceiverCard;
