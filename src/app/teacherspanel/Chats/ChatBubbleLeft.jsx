// components/ChatBubbleLeft.js

import React from 'react';

const ChatBubbleLeft = ({ text, time, fileUrl, voiceUrl }) => {
  //console.log('ChatBubbleLeft props:', { text, time, fileUrl, voiceUrl });
  return (
    <div className="flex gap-2   justify-center m-3">
      <div className="flex gap-2 items-center justify-center h-14  ">
        <div className="h-[12px] w-[12px] bg-white rounded-full border border-blue-500" />
        <div className="h-4 w-4 bg-white rounded-full border border-blue-500" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-md font-medium px-5 py-3 rounded-full bg-white  border border-blue-500">
          {text && <p className="text-black">{text}</p>}
          {fileUrl && <img src={fileUrl} alt="file" className="w-full h-auto" />}
          {voiceUrl && (
            <audio controls className="w-[200px]">
              <source src={voiceUrl} type="audio/webm" />
            </audio>
          )}
        </div>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
    </div>
  );
};

export default ChatBubbleLeft;



{/*export default function ChatBubbleLeft({ text, time }) {
  return (
    <>
      <div className="flex gap-2   justify-center m-3">
        <div className="flex gap-2 items-center justify-center h-14  ">
          <div className="h-[12px] w-[12px] bg-white rounded-full border border-blue-500" />
          <div className="h-4 w-4 bg-white rounded-full border border-blue-500" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-md font-medium px-5 py-3 rounded-full bg-white  border border-blue-500">
            {text}
          </div>
          <h1 className="text-sm font-medium text-gray-600"> {time}</h1>
        </div>
      </div>
    </>
  );
}
  */}

