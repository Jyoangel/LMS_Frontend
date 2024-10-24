"use client"
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Image from "next/image";
import { BsTelephone, BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FiSend } from "react-icons/fi";
import { TiMicrophoneOutline } from "react-icons/ti";
import { VscDeviceCamera } from "react-icons/vsc";
import community from "./community.png";
import ChatBubbleLeft from "./ChatBubbleLeft";
import ChatBubbleRight from "./ChatBubbleRight";
import Peer from "simple-peer";
import CallerCard from "./CallerCard";
import ReceiverCard from "./ReceiverCard";
import axios from "axios";
import { checkUserRole } from "../../../../api/teacherapi"; // Import checkUserRole function
import { useUser } from "@auth0/nextjs-auth0/client";

const socket = io(`${process.env.NEXT_PUBLIC_API_SERVER_URL}`);// socket backend connect URL 

export default function Chats() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showFileOptions, setShowFileOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [audioURL, setAudioURL] = useState("");
  const [recordedAudio, setRecordedAudio] = useState(null);

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callEstablished, setCallEstablished] = useState(false);
  const [peer, setPeer] = useState(null);
  const [showCallerCard, setShowCallerCard] = useState(false);
  const [showReceiverCard, setShowReceiverCard] = useState(false);
  const [incomingSignal, setIncomingSignal] = useState(null);
  const [callerId, setCallerId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);  // Manages the incoming call data
  const [call_duration, set_call_duration] = useState(0); // Track call duration in seconds
  const call_timer_ref = useRef(null);
  const { user, error: userError, isLoading: userLoading } = useUser();
  const [userId, setUserId] = useState(null);
  const [teacherId, setTeacherId] = useState(null);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);

  // Check user role and retrieve userId
  useEffect(() => {
    async function getUserRole() {
      const email = user?.email; // Ensure user email is available
      if (!email) return; // Prevent unnecessary fetch

      try {
        const result = await checkUserRole(email); // Use the imported function

        if (result.exists) {
          setUserId(result.userId);
          setTeacherId(result.teacherId) // Set userId from the response
        } else {
          setError("User not found or does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setError("Failed to fetch user role.");
      }
    }

    getUserRole();
  }, [user]);
  // use to fetch user using auth0
  // Inside the Chats component
  useEffect(() => {
    async function fetchUsers() {
      if (!user || !userId) return; // Ensure user and userId are available

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/chat/fetchUsers?userId=${userId}`);
        console.log("Fetched Users:", response.data);

        // Filter out the logged-in user by comparing emails
        const filteredUsers = response.data.filter(fetchedUser => fetchedUser.email !== user.email);

        setUsers(filteredUsers); // Set the filtered users
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [user, userId]); // Dependency on both user and userId

  // Dependency on both user and userLoading




  // use to fetch saved messages

  useEffect(() => {
    if (user) {
      // Register the user with the socket when available
      socket.emit("register", teacherId);
    }

    if (selectedUser) {
      // Fetch chat messages between the logged-in user and the selected user
      const fetchMessages = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/chat/messages?sender=${teacherId}&receiver=${selectedUser._id}`
          );
          if (response.ok) {
            const data = await response.json();
            console.log("Fetched messages:", data);
            setMessages(data);
          } else {
            console.error("Error fetching messages:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();
    }

    // Handle incoming messages
    socket.on("receiveMessage", (message) => {
      if (
        (message.sender === teacherId && message.receiver === selectedUser?._id) ||
        (message.receiver === teacherId && message.sender === selectedUser?._id)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    // Handle incoming call signal
    socket.on("call", (data) => {
      console.log("Incoming Call Signal Data:", data.signal);
      console.log("Receiving call from:", data.from);

      if (data.to === selectedUser?._id) {
        setIncomingSignal(data.signal);
        setCallerId(data.from);
        setShowReceiverCard(true);


        // Log the updated values
        console.log("Incoming Signal set to:", data.signal);
        console.log("Caller ID set to:", data.from);
        console.log("Receiver Card visibility set to:", true);
      }
    });

    // Handle the answer signal for the call
    socket.on("answer", (data) => {
      console.log("Answer event received, data:", data);
      console.log("Answer event received: to =", data.to, "user.sub =", teacherId);
      console.log("Current user ID (user.sub):", teacherId);
      console.log("Peer object at answer event:", peer);

      if (data.to === teacherId && peer) {
        console.log("Caller received answer signal:", data.signal);

        console.log(data.to);
        setReceiverId(data.from);
        peer.signal(data.signal);
        setShowCallerCard(false);
      }
    });



    // Clean up event listeners on unmount or dependency change
    return () => {
      socket.off("receiveMessage");
      socket.off("call");
      socket.off("answer");
    };
  }, [localStream, peer, selectedUser, user]); // Dependency array


  // Function to format the duration into a readable format (minutes:seconds)
  const format_duration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Start the timer when the call is established
  useEffect(() => {
    if (callEstablished) {
      call_timer_ref.current = setInterval(() => {
        set_call_duration((prev) => prev + 1);
      }, 1000); // Update the call duration every second
    } else {
      // Reset the timer when the call ends
      clearInterval(call_timer_ref.current);
      set_call_duration(0); // Reset call duration
    }

    return () => clearInterval(call_timer_ref.current); // Cleanup the timer on unmount
  }, [callEstablished]);


  const handleSendMessage = async () => {
    if (!selectedUser) return;

    const senderId = teacherId;
    const receiverId = selectedUser._id;
    const senderModel = "TeacherDetail";
    const receiverModel = "TeacherDetail";

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("time", new Date().toLocaleTimeString());
      formData.append("sender", senderId);
      formData.append("senderModel", senderModel);
      formData.append("receiver", receiverId);
      formData.append("receiverModel", receiverModel);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/chat/send`, // use to send file message
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const newMessage = await response.json();
          socket.emit("sendMessage", newMessage);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setSelectedFile(null);
        } else {
          console.error(
            "Error sending message with file:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error sending message with file:", error);
      }
    } else if (recordedAudio) {
      const formData = new FormData();
      formData.append("voice", recordedAudio);
      formData.append("time", new Date().toLocaleTimeString());
      formData.append("sender", senderId);
      formData.append("senderModel", senderModel);
      formData.append("receiver", receiverId);
      formData.append("receiverModel", receiverModel);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/chat/upload-voice`,// use to sent voice message
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const voiceData = await response.json();

          try {
            const newMessageResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/chat/send`,// use to send message
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  time: new Date().toLocaleTimeString(),
                  sender: senderId,
                  senderModel,
                  receiver: receiverId,
                  receiverModel,
                  voiceUrl: voiceData.voiceUrl,
                }),
              }
            );

            if (newMessageResponse.ok) {
              const newMessage = await newMessageResponse.json();
              socket.emit("sendMessage", newMessage);
              setMessages((prevMessages) => [...prevMessages, newMessage]);
              setRecordedAudio(null);
            } else {
              console.error(
                "Error sending voice message:",
                newMessageResponse.statusText
              );
            }
          } catch (innerError) {
            console.error("Error sending voice message:", innerError);
          }
        } else {
          console.error(
            "Error uploading voice message:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error uploading voice message:", error);
      }
    } else if (message) {
      try {
        const newMessageResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/chat/send`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              time: new Date().toLocaleTimeString(),
              sender: senderId,
              senderModel,
              receiver: receiverId,
              receiverModel,
              text: message,
            }),
          }
        );

        if (newMessageResponse.ok) {
          const newMessage = await newMessageResponse.json();
          socket.emit("sendMessage", newMessage);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setMessage("");
        } else {
          console.error("Error sending message:", response.statusText);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  // use to select file 
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // it stop recording 

  const startRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          setAudioURL(URL.createObjectURL(event.data));
          setRecordedAudio(event.data); // Store the recorded audio blob
        };
        mediaRecorderRef.current.start();
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };
  // it stop recording after leave voice recording icon and send the voice recording 
  const handleMouseLeave = () => {
    stopRecording();
    if (recordedAudio && selectedUser) {
      const senderId = teacherId;
      const receiverId = selectedUser._id;
      const senderModel = 'TeacherDetail';
      const receiverModel = 'TeacherDetail';

      const formData = new FormData();
      formData.append('voice', recordedAudio);
      formData.append('time', new Date().toLocaleTimeString());
      formData.append('sender', senderId);
      formData.append('senderModel', senderModel);
      formData.append('receiver', receiverId);
      formData.append('receiverModel', receiverModel);

      fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/chat/upload-voice`, {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          const newMessage = {
            time: new Date().toLocaleTimeString(),
            sender: senderId,
            senderModel,
            receiver: receiverId,
            receiverModel,
            voiceUrl: data.voiceUrl,
          };

          socket.emit('sendMessage', newMessage);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setRecordedAudio(null); // Clear the recorded audio after sending
        });
    }
  };
  // use to on camera
  const openCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        video.addEventListener('loadedmetadata', () => {
          document.body.appendChild(video);
        });
      });
  };

  // const handleCall = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       video: false,
  //       audio: true,
  //     });
  //     setLocalStream(stream);

  //     const newPeer = new Peer({
  //       initiator: true,
  //       trickle: false,
  //       stream,
  //     });

  //     setPeer(newPeer);

  //     newPeer.on("signal", (signal) => {
  //       console.log("Caller Signal Data:", signal);
  //       socket.emit("call", {
  //         signal,
  //         to: selectedUser.user_id,
  //         from: user.sub,
  //       });
  //     });

  //     newPeer.on("stream", (stream) => {
  //       setRemoteStream(stream);
  //       setCallEstablished(true);
  //     });

  //     setShowCallerCard(true);

  //     // newPeer.on("data", (data) => {
  //     //   console.log("Received data:", data.toString());
  //     // });

  //     // socket.on("receiveCall", (data) => {
  //     //   handleIncomingCall(data.signal);
  //     // });

  //     // socket.on("answer", (data) => {
  //     //   if (peer) {
  //     //     peer.signal(data.signal);
  //     //   }
  //     // });
  //   } catch (error) {
  //     console.error("Error accessing media devices:", error);
  //   }
  // };

  // const handleAnswerCall = () => {
  //   const answerPeer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream: localStream,
  //   });

  //   setPeer(answerPeer);

  //   answerPeer.on("signal", (signal) => {
  //     socket.emit("answer", {
  //       signal,
  //       to: callerId,
  //       from: user.sub,
  //     });
  //   });

  //   answerPeer.signal(incomingSignal);

  //   answerPeer.on("stream", (stream) => {
  //     setRemoteStream(stream);
  //     setCallEstablished(true);
  //   });

  //   setShowReceiverCard(false);

  // };


  // const handleAnswerCall = () => {
  //   const answerPeer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream: localStream, // Answerer's local stream
  //   });

  //   setPeer(answerPeer);

  //   // Send the answer signal back to the caller
  //   answerPeer.on("signal", (signal) => {
  //     socket.emit("answer", {
  //       signal,
  //       to: callerId, // Send the answer back to the caller
  //       from: user.sub,
  //     });
  //   });

  //   // Signal the incoming call data (received signal)
  //   answerPeer.signal(incomingSignal);

  //   // When the stream is received from the caller
  //   answerPeer.on("stream", (stream) => {
  //     setLocalStream(stream); // Set the remote stream to play the caller's audio/video
  //     setCallEstablished(true); // Indicate the call has been established
  //   });

  //   // Hide the receiver card after answering the call
  //   setShowReceiverCard(false);

  //   // Inform the caller to hide their caller card
  //   socket.emit("hideCallerCard", { to: callerId });
  // };

  // call to other user student or teacher
  const handleCall = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });
        setLocalStream(stream);

        const newPeer = new Peer({
          initiator: true,
          trickle: false,
          stream,
        });

        setPeer(newPeer);

        newPeer.on("signal", (signal) => {
          console.log("Caller Signal Data:", signal);
          socket.emit("call", {
            signal,
            to: selectedUser._id,
            from: teacherId,
          });
        });
        //set
        newPeer.on("stream", (stream) => {
          setRemoteStream(stream);
          setCallEstablished(true);
        });

        setShowCallerCard(true);


      } else {
        console.error("MediaDevices API not available.");
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };
  // use to answer the call from other user
  const handleAnswerCall = () => {
    // Get the user's media stream (audio in this case)
    if (!localStream) {
      navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
        setLocalStream(stream);
        initializeAnswerPeer(stream);
      });
    } else {
      initializeAnswerPeer(localStream);
    }
  };

  // Function to initialize the Peer for answering the call
  const initializeAnswerPeer = (stream) => {
    const answerPeer = new Peer({
      initiator: false,  // The receiver is not the initiator
      trickle: false,    // Disable trickling for signaling
      stream: stream,    // Use the receiver's local stream (audio)
    });

    //setPeer(answerPeer);

    // Send the answer signal back to the caller
    answerPeer.on("signal", (signal) => {
      console.log("Receiver peer signal:", signal);
      console.log("Sending answer to:", callerId); // This should be the caller's ID
      socket.emit("answer", {
        signal,
        to: callerId, // Send the answer back to the caller
        from: teacherId,
      });

    });


    if (incomingSignal) {
      answerPeer.signal(incomingSignal);
      setIncomingSignal(null); // Clear the incoming signal after use
    }



    // When the stream from the caller is received
    answerPeer.on("stream", (remoteStream) => {
      setRemoteStream(remoteStream); // Set the remote stream (caller’s audio)
      setCallEstablished(true);      // Call is established, show the stream
      playAudio(remoteStream);
      // Inform the caller that the call has been answered
      // Play the audio automatically

    });

    // Handle peer disconnection/close event
    answerPeer.on("close", () => {
      // Perform cleanup when the call is closed
      setCallEstablished(false);
      setLocalStream(null);
      setRemoteStream(null);
    });

    // Hide the receiver card after answering the call
    setShowReceiverCard(false);
    setShowCallerCard(false);



  };

  // Play the audio stream
  const playAudio = (remoteStream) => {
    const audioTracks = remoteStream.getAudioTracks();
    if (audioTracks.length > 0) {
      const audio = new Audio();
      audio.srcObject = remoteStream;
      audio.play().catch((err) => console.error("Error playing audio:", err));
      console.log("Playing received audio stream...");
    } else {
      console.log("No audio tracks received");
    }
  };







  // use to end the incoming call 

  const handleEndCall = () => {
    // Stop the local audio stream

    console.log("Receiver ID:", receiverId);
    if (localStream) {
      console.log(localStream.getTracks());
      localStream.getTracks().forEach(track => track.stop()); // Stop all tracks (audio tracks in this case)
    }

    // Clean up peer connection and state
    if (peer) {
      peer.destroy(); // Destroy the peer connection
    }

    // Notify the other user
    socket.emit('callEnded', { to: callerId || receiverId, from: teacherId });

    setLocalStream(null);
    setRemoteStream(null);
    setCallEstablished(false);
    setShowCallerCard(false);
    setShowReceiverCard(false);
  };

  useEffect(() => {
    socket.on('callEnded', (data) => {
      console.log('Call ended by:', data.from);

      // Stop the local audio stream if it's still active
      if (localStream) {
        console.log(localStream.getTracks());
        localStream.getTracks().forEach(track => track.stop()); // Stop all tracks
      }

      // Clean up the UI and peer connection
      if (peer) {
        peer.destroy(); // Destroy the peer connection
      }

      // Reset UI and state
      setLocalStream(null);
      setRemoteStream(null);
      setCallEstablished(false);
      setShowCallerCard(false);
      setShowReceiverCard(false);
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off('callEnded');
    };
  }, [localStream, peer]);


  return (
    <div className="bg-gray-100 p-4 flex h-screen">
      <div className="flex flex-col bg-white p-4 shadow-lg rounded-lg w-1/4 h-full">
        <div className="flex items-center mb-4">
          <Image src={community} alt="Community" width={50} height={50} className="rounded-full mr-4" />
          <h2 className="text-xl font-bold">Community</h2>
        </div>
        <div className="relative mb-4">
          <input type="text" className="w-full border border-gray-300 rounded-full py-2 px-4" placeholder="Search..." />
          <CiSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
        <div className="overflow-y-auto flex-grow">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : users.length === 0 ? (
            <p>No other users available</p>
          ) : (
            users.map((user) => (
              <button
                key={user._id}
                onClick={() => {
                  setSelectedUser(user);
                  setMessages([]); // Clear the previous messages when selecting a new user
                }}
                className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              >
                <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                  {user.picture ? (
                    <div
                      src={user.picture}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="text-white font-bold">
                      {user.name[0].toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="ml-2 text-sm font-semibold">{user.name}</div>
              </button>
            ))
          )}
        </div>
      </div>
      <div className="flex flex-col bg-white p-4 shadow-lg rounded-lg w-3/4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {selectedUser ? selectedUser.name : 'Select a user to chat'}
          </h2>
          <div className="flex items-center">
            {/* use to select user whom to chat */}
            {selectedUser && (
              <div className="flex items-center space-x-4">
                <button
                  className="p-2 rounded-full hover:bg-gray-200"
                  onClick={handleCall}
                >
                  <BsTelephone size={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-200">
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="h-auto w-full bg-blue-200 flex flex-col gap-5 py-10 px-5 overflow-y-scroll no-scrollbar" data-testid="messages">
          {/* .map() function iterates through each messages betwwen the two user and show */}
          {messages.map((msg, index) => (
            //console.log('Message:', msg);
            //console.log('Sender ID:', senderId);
            //console.log('Is sender ID equal to msg.sender?', senderId === msg.sender);
            <div key={index} className={`w-full flex items-center justify-${msg.sender === teacherId ? 'end' : 'start'}`}>
              {msg.sender === teacherId ? (
                <ChatBubbleLeft text={msg.text} time={msg.time} fileUrl={msg.fileUrl}
                  voiceUrl={msg.voiceUrl} />
              ) : (
                <ChatBubbleRight text={msg.text} time={msg.time} fileUrl={msg.fileUrl}
                  voiceUrl={msg.voiceUrl} />
              )}
            </div>
          ))}
        </div>
        <div className="h-auto w-[95%] flex flex-row gap-2">
          <div className="flex flex-row justify-end items-center gap-3">


          </div>
          <div className="flex flex-row gap-2 items-center justify-center w-[95%] border border-gray-300 rounded-full px-5">
            <input
              type="file"
              id="file-input"
              accept="image/*, video/*"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
            <label htmlFor="file-input" className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 21h-5a4.5 4.5 0 01-4.5-4.5v-9A4.5 4.5 0 019.5 3h5a4.5 4.5 0 014.5 4.5v9a4.5 4.5 0 01-4.5 4.5z"></path>
                <path d="M9 10.5L12 13.5 15 10.5"></path>
              </svg>
            </label>
            <input
              type="text"
              className="h-12 w-full border-none outline-none rounded-full p-2"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              data-testid="input"
            />
            <VscDeviceCamera size={30} className="text-gray-400 cursor-pointer" onClick={openCamera} />
            <div className="rounded-full bg-white h-14 border border-gray-300 px-14 relative">
              <div className="absolute right-10 top-3">
                <button
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                  onMouseLeave={handleMouseLeave}
                  className="bg-gray-200 p-2 rounded-full"
                >
                  <TiMicrophoneOutline size={20} />
                </button>

              </div>
            </div>
            <FiSend size={30} className="text-blue-500 cursor-pointer " data-testid="send-button" onClick={handleSendMessage} />
          </div>


        </div>
      </div>
      {showCallerCard && <CallerCard onEndCall={handleEndCall} />}
      {showReceiverCard && <ReceiverCard onReceiveCall={handleAnswerCall} onEndCall={handleEndCall} callerId={callerId} />}
      {callEstablished && (
        <div className="fixed bottom-5 right-5 w-[300px] h-[150px] border border-gray-500 rounded-xl bg-white p-4">
          <div className="text-lg font-bold">Call Duration: {format_duration(call_duration)}</div>

          {/* Audio for Remote Stream (Other person's audio) */}
          <audio
            autoPlay
            ref={(audio) => {
              if (audio && remoteStream) audio.srcObject = remoteStream; // Attach the remote stream (other person's audio)
            }}
          ></audio>

          <button className="mt-2" onClick={handleEndCall}>End Call</button>
        </div>
      )}

    </div>
  );
}




{/*
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Image from 'next/image';
import { BsTelephone, BsThreeDotsVertical } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { FiSend } from 'react-icons/fi';
import { TiMicrophoneOutline } from 'react-icons/ti';
import { VscDeviceCamera } from 'react-icons/vsc';
import community from './community.png';
import ChatBubbleLeft from './ChatBubbleLeft';
import ChatBubbleRight from './ChatBubbleRight';
import Peer from 'simple-peer';
import CallerCard from './CallerCard';
import ReceiverCard from './ReceiverCard';

const socket = io(${process.env.NEXT_PUBLIC_API_SERVER_URL}'); // Update the server URL

export default function Chats() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [showFileOptions, setShowFileOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [audioURL, setAudioURL] = useState('');
  const [recordedAudio, setRecordedAudio] = useState(null);

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callEstablished, setCallEstablished] = useState(false);
  const [peer, setPeer] = useState(null);

  const [showCallerCard, setShowCallerCard] = useState(false);
  const [showReceiverCard, setShowReceiverCard] = useState(false);

  const senderId = '665053d88ad154db13e18bc8'; // Sender teacher ID
  const receiverId = '66546cc9f620502d4ce0331f'; // Receiver teacher ID

  useEffect(() => {
    console.log("Attempting to connect to socket...");

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    // Fetch initial messages from database
    fetch(`http://localhost:5000/api/chat/messages?sender=${senderId}&receiver=${receiverId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched initial messages:', data);
        setMessages(data);
      })
      .catch(error => console.error('Error fetching messages:', error));

    socket.on('receiveMessage', (message) => {
      console.log('Message received:', message);
      setMessages((prevMessages) => [...prevMessages, { ...message, received: true }]);
    });

    socket.on('call', (data) => {
      console.log('Incoming call data:', data);
      console.log('Expected receiverId:', receiverId);
      if (data.to === receiverId) {
        console.log('Received call from', data.from);
        setShowReceiverCard(true);

        const peer = new Peer({
          initiator: false,
          stream: localStream,
        });

        setPeer(peer);

        peer.signal(data.signal);

        peer.on('stream', (stream) => {
          console.log('Received remote stream');
          setCallEstablished(true);
          setRemoteStream(stream);
        });

        peer.on('error', (error) => {
          console.error('Peer error:', error);
        });
      }
    });

    socket.on('answer', (data) => {
      console.log('Answer received:', data);
      console.log('Expected senderId:', senderId);
      if (data.to === senderId) {
        console.log('Received answer from', data.from);
        peer.signal(data.signal);
      }
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('call');
      socket.off('answer');
    };
  }, [localStream, peer]);

  const handleSendMessage = async () => {
    const newMessage = {
      sender: senderId,
      receiver: receiverId,
      text: message,
      time: new Date().toISOString(),
    };

    console.log('Sending message:', newMessage);
    socket.emit('sendMessage', newMessage);
    setMessages((prevMessages) => [...prevMessages, { ...newMessage, received: false }]);
    setMessage('');
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileOptionsToggle = () => {
    setShowFileOptions(!showFileOptions);
  };

  const startRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          setAudioURL(URL.createObjectURL(event.data));
          setRecordedAudio(event.data); // Store the recorded audio blob
        };
        mediaRecorderRef.current.start();
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleMouseLeave = () => {
    // ... (existing voice message handling code)
  };

  const openCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        video.addEventListener('loadedmetadata', () => {
          document.body.appendChild(video);
        });
      });
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setLocalStream(stream);
        console.log('Local stream obtained');
      })
      .catch(error => console.error('Error getting user media:', error));
  }, []);

  const handleCallButton = () => {
    if (!localStream) return;

    const peer = new Peer({
      initiator: true,
      stream: localStream,
      trickle: false,
    });

    setPeer(peer);
    setShowCallerCard(true);

    peer.on('signal', (signal) => {
      console.log('Calling with signal:', signal);
      socket.emit('call', { to: receiverId, from: senderId, signal });
    });

    peer.on('stream', (stream) => {
      console.log('Received remote stream');
      setCallEstablished(true);
      setRemoteStream(stream);
    });

    peer.on('error', (error) => {
      console.error('Peer error:', error);
    });
  };

  const handleEndCall = () => {
    if (peer) {
      console.log('Ending call');
      peer.destroy();
      setPeer(null);
      setCallEstablished(false);
      setShowCallerCard(false);
      setShowReceiverCard(false);
    }
  };

  const handleReceiveCall = () => {
    if (peer) {
      console.log('Answering call');
      peer.signal();
      setShowReceiverCard(false);
      setCallEstablished(true);
    }
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col gap-5 pl-10 py-10">
        <div className="h-12 w-full flex flex-row items-center justify-between">
          <div className="flex flex-row gap-6">
            <h1 className="text-black text-lg font-medium">Total Students</h1>
          </div>
          <div className="flex flex-row gap-2">
            <h1 className="text-black text-lg font-medium">Filter</h1>
            <select className="h-8 w-28 border border-gray-500 outline-none rounded-lg p-1">
              <option>Select</option>
            </select>
          </div>
        </div>

        <div className="w-full h-screen flex flex-row">
          {/* left side *
          <div className="h-auto w-[40%] flex flex-col gap-5">
            <div className="h-10 w-[95%] border border-gray-300 rounded-sm flex flex-row items-center gap-2 px-5 py-5">
              <CiSearch size={20} />
              <h1>Search</h1>
            </div>
            <div className="h-auto py-5 w-[95%] border border-blue-300 flex flex-col gap-5 rounded-xl px-5">
              <h1 className="text-black text-lg font-bold">Group</h1>
              {/* Repeat the following block for each group *
              <div className="h-[62px] w-full flex flex-row items-center justify-between">
                <div className="h-auto w-auto flex flex-row items-center gap-5">
                  <div className="h-[42px] w-[42px]">
                    <Image
                      src={community}
                      alt="Group Image"
                      className="h-full w-full"
                    />
                  </div>
                  <div className="h-auto w-auto flex flex-col">
                    <h1 className="text-black text-lg font-medium">Meeting</h1>
                    <p className="text-gray-400 text-sm font-normal">Online</p>
                  </div>
                </div>
                <BsThreeDotsVertical size={20} />
              </div>
            </div>
          </div>

          {/* right side *
          <div className="h-auto w-[60%] border border-gray-300 rounded-sm flex flex-col">
            <div className="h-20 w-full flex flex-row items-center justify-between px-10">
              <div className="flex flex-row items-center gap-5">
                <div className="h-[42px] w-[42px]">
                  <Image
                    src={community}
                    alt="Group Image"
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-black text-lg font-medium">Meeting</h1>
                  <p className="text-gray-400 text-sm font-normal">Online</p>
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <BsTelephone size={25} onClick={handleCallButton} />
                <VscDeviceCamera size={25} onClick={openCamera} />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <div key={index} className={`w-full flex items-center justify-${msg.sender === senderId ? 'end' : 'tart'}`}>
                  {msg.sender === senderId ? (
                    <ChatBubbleRight text={msg.text} time={msg.time} fileUrl={msg.fileUrl} voiceUrl={msg.voiceUrl} />
                  ) : (
                    <ChatBubbleLeft text={msg.text} time={msg.time} fileUrl={msg.fileUrl} voiceUrl={msg.voiceUrl} />
                  )}
                </div>
              ))}
            </div>
            <div className="h-20 w-full flex flex-row items-center gap-5 px-10">
              <div className="flex flex-row gap-2 relative">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  Upload File
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                  onClick={handleFileOptionsToggle}
                >
                  {showFileOptions ? 'Cancel' : 'Options'}
                </button>
                {showFileOptions && (
                  <div className="absolute top-12 left-0 bg-white shadow-md rounded-lg p-3">
                    <button
                      className="block px-4 py-2 text-black hover:bg-gray-100 w-full text-left"
                      onClick={openCamera}
                    >
                      Open Camera
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-5">
                <TiMicrophoneOutline size={25} onClick={isRecording ? stopRecording : startRecording} />
                {audioURL && (
                  <audio controls src={audioURL} />
                )}
                <input
                  type="text"
                  className="h-10 w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <FiSend size={25} onClick={handleSendMessage} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCallerCard && <CallerCard onEndCall={handleEndCall} />}
      {showReceiverCard && <ReceiverCard onReceiveCall={handleReceiveCall} onEndCall={handleEndCall} />}
    </>
  );
}



{/*
// pages/teacherspanel/Chats.js
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Image from 'next/image';
import { BsTelephone, BsThreeDotsVertical } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { FiSend } from 'react-icons/fi';
import { TiMicrophoneOutline } from 'react-icons/ti';
import { VscDeviceCamera } from 'react-icons/vsc';
import community from './community.png';
import ChatBubbleLeft from './ChatBubbleLeft';
import ChatBubbleRight from './ChatBubbleRight';
import Peer from 'simple-peer';

const socket = io(${process.env.NEXT_PUBLIC_API_SERVER_URL}'); // Update the server URL

export default function Chats() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [showFileOptions, setShowFileOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [audioURL, setAudioURL] = useState('');
  const [recordedAudio, setRecordedAudio] = useState(null);

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callEstablished, setCallEstablished] = useState(false);
  const [peer, setPeer] = useState(null);


  const senderId = '665053d88ad154db13e18bc8'; // Sender teacher ID
  const receiverId = '66546cc9f620502d4ce0331f'; // Receiver teacher ID

  useEffect(() => {
    // Fetch initial messages from database
    fetch(`http://localhost:5000/api/chat/messages?sender=${senderId}&receiver=${receiverId}`)
      .then(response => response.json())
      .then(data => setMessages(data));


    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, { ...message, received: true }]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);


  const handleSendMessage = async () => {

    const senderModel = 'TeacherDetail';
    const receiverModel = 'TeacherDetail';

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('time', new Date().toLocaleTimeString());
      formData.append('sender', senderId);
      formData.append('senderModel', senderModel);
      formData.append('receiver', receiverId);
      formData.append('receiverModel', receiverModel);

      try {
        const response = await fetch(${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/chat/send', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const newMessage = await response.json();
          socket.emit('sendMessage', newMessage);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setSelectedFile(null);
        } else {
          console.error('Error sending message with file:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending message with file:', error);
      }
    } else if (recordedAudio) {
      console.log('Recorded audio:', recordedAudio);
      const formData = new FormData();
      formData.append('voice', recordedAudio);
      formData.append('time', new Date().toLocaleTimeString());
      formData.append('sender', senderId);
      formData.append('senderModel', senderModel);
      formData.append('receiver', receiverId);
      formData.append('receiverModel', receiverModel);

      try {
        const response = await fetch(${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/chat/upload-voice', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const voiceData = await response.json();

          try {
            const newMessageResponse = await fetch(${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/chat/send', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                time: new Date().toLocaleTimeString(),
                sender: senderId,
                senderModel,
                receiver: receiverId,
                receiverModel,
                voiceUrl: voiceData.voiceUrl,
              }),
            });

            if (newMessageResponse.ok) {
              const newMessage = await newMessageResponse.json();
              socket.emit('sendMessage', newMessage);
              setMessages((prevMessages) => [...prevMessages, newMessage]);

              setRecordedAudio(null);
            } else {
              console.error('Error sending voice message:', newMessageResponse.statusText);
            }
          } catch (innerError) {
            console.error('Error sending voice message:', innerError);
          }
        } else {
          console.error('Error uploading voice message:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading voice message:', error);
      }
    } else if (message) {
      try {
        const newMessageResponse = await fetch(${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/chat/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            time: new Date().toLocaleTimeString(),
            sender: senderId,
            senderModel,
            receiver: receiverId,
            receiverModel,
            text: message,
          }),
        });

        if (newMessageResponse.ok) {
          const newMessage = await newMessageResponse.json();
          socket.emit('sendMessage', newMessage);
          setMessages((prevMessages) => [...prevMessages, newMessage]);

          setMessage('');

        } else {
          console.error('Error sending message :', response.statusText);
        }
      } catch (error) {
        console.error('Error sending message :', error);
      }
    }
  };


  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileOptionsToggle = () => {
    setShowFileOptions(!showFileOptions);
  };

  const startRecording = () => {

    setIsRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          setAudioURL(URL.createObjectURL(event.data));
          setRecordedAudio(event.data); // Store the recorded audio blob
        };
        mediaRecorderRef.current.start();
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleMouseLeave = () => {
    const senderId = '665053d88ad154db13e18bc8'; // Example sender ID
    const receiverId = '66546cc9f620502d4ce0331f'; // Example receiver ID
    const senderModel = 'TeacherDetail';
    const receiverModel = 'TeacherDetail';
    stopRecording();
    if (recordedAudio) {
      console.log('Recorded audio:', recordedAudio);
      const formData = new FormData();
      formData.append('voice', recordedAudio);
      formData.append('time', new Date().toLocaleTimeString());
      formData.append('sender', senderId);
      formData.append('senderModel', senderModel);
      formData.append('receiver', receiverId);
      formData.append('receiverModel', receiverModel);

      fetch(${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/chat/upload-voice', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Upload voice response:', data);
          const newMessage = {
            voiceUrl: data.voiceUrl,
            time: new Date().toLocaleTimeString(),
            sender: senderId,
            senderModel,
            receiver: receiverId,
            receiverModel,
          };

          fetch(${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/chat/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMessage),
          });
        })
        .catch(error => console.error('Error uploading voice message:', error));

    }
  };

  const openCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        video.addEventListener('loadedmetadata', () => {
          document.body.appendChild(video);
        });
      });
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setLocalStream(stream);
        console.log('Local stream obtained');
      })
      .catch(error => console.error('Error getting user media:', error));
  }, []);

  const handleCallButton = () => {
    if (!localStream) return;

    const peer = new Peer({
      initiator: true,
      stream: localStream,
    });

    setPeer(peer);

    socket.emit('call', { to: receiverId, from: senderId, signal: peer.signal });
    console.log('Call initiated to', receiverId);
  };

  useEffect(() => {
    socket.on('call', (data) => {
      if (data.to === receiverId) {
        console.log('Received call from', data.from);
        const peer = new Peer({
          initiator: false,
          stream: localStream,
        });

        setPeer(peer);

        peer.signal(data.signal);

        peer.on('stream', (stream) => {
          setCallEstablished(true);
          console.log('Call established');
        });
      }
    });

    socket.on('answer', (data) => {
      if (data.to === senderId) {
        console.log('Received answer from', data.from);
        peer.signal(data.signal);
      }
    });
  }, [localStream, peer]);




  return (
    <>
      <div className="h-screen w-full flex flex-col gap-5 pl-10 py-10">
        <div className="h-12 w-full flex flex-row items-center justify-between">
          <div className="flex flex-row gap-6">
            <h1 className="text-black text-lg font-medium">Total Students</h1>
          </div>
          <div className="flex flex-row gap-2">
            <h1 className="text-black text-lg font-medium">Filter</h1>
            <select className="h-8 w-28 border border-gray-500 outline-none rounded-lg p-1">
              <option>Select</option>
            </select>
          </div>
        </div>

        <div className="w-full h-screen flex flex-row">
          {/* left side *
<div className="h-auto w-[40%] flex flex-col gap-5">
  <div className="h-10 w-[95%] border border-gray-300 rounded-sm flex flex-row items-center gap-2 px-5 py-5">
    <CiSearch size={20} />
    <h1>Search</h1>
  </div>
  <div className="h-auto py-5 w-[95%] border border-blue-300 flex flex-col gap-5 rounded-xl px-5">
    <h1 className="text-black text-lg font-bold">Group</h1>
    {/* Repeat the following block for each group *
    <div className="h-[62px] w-[90%] flex flex-row items-center justify-between">
      <div className="flex flex-row gap-2 items-center justify-center">
        <Image src={community} />
        <h1 className="text-black text-md font-semibold">
          Class Community
        </h1>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xs text-gray-500">Last Seen</h1>
        <h1 className="text-xs text-gray-500">10.00AM</h1>
      </div>
    </div>
  </div>
  <div className="h-auto py-5 rounded-xl w-[95%] border border-blue-300 flex flex-col gap-5 px-5">
    <h1 className="text-black text-lg font-bold">People</h1>
    {/* Repeat the following block for each person *
    <div className="h-[62px] w-[90%] flex flex-row items-center justify-between">
      <div className="flex flex-row gap-2 items-center justify-center">
        <Image src={community} />
        <h1 className="text-black text-md font-semibold">
          Jay Kumar
        </h1>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xs text-green-500">Online Now</h1>
      </div>
    </div>
    <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
      <div className="flex flex-row gap-2 items-center justify-center">
        <Image src={community} />
        <h1 className="text-black text-md font-semibold">
          Kran Kumar
        </h1>
      </div>
      <div className="flex flex-col ">
        <h1 className="text-xs text-gray-500">Last Seen</h1>
        <h1 className="text-xs text-gray-500">10.00AM</h1>
      </div>
    </div>
    <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
      <div className="flex flex-row gap-2 items-center justify-center">
        <Image src={community} />
        <h1 className="text-black text-md font-semibold">
          Kamlesh Kumar
        </h1>
      </div>
      <div className="flex flex-col ">
        <h1 className="text-xs text-gray-500">Last Seen</h1>
        <h1 className="text-xs text-gray-500">10.00AM</h1>
      </div>
    </div>
    <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
      <div className="flex flex-row gap-2 items-center justify-center">
        <Image src={community} />
        <h1 className="text-black text-md font-semibold">
          Jyoti Gupta
        </h1>
      </div>
      <div className="flex flex-col ">
        <h1 className="text-xs text-gray-500">Last Seen</h1>
        <h1 className="text-xs text-gray-500">10.00AM</h1>
      </div>
    </div>
    <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
      <div className="flex flex-row gap-2 items-center justify-center">
        <Image src={community} />
        <h1 className="text-black text-md font-semibold">Nikita</h1>
      </div>
      <div className="flex flex-col ">
        <h1 className="text-xs text-gray-500">Last Seen</h1>
        <h1 class="text-xs text-gray-500">10.00AM</h1>
      </div>
    </div>
  </div>
</div>

{/* right side *
<div className="h-auto w-[60%] flex flex-col gap-5">
  <div className="h-[91px] w-[95%] flex flex-row items-center justify-between">
    <div className="flex flex-row gap-5 items-center justify-center">
      <Image src={community} />
      <h1 className="text-black text-md font-semibold">Jay Kumar</h1>
    </div>
    <div className="flex flex-row gap-3 items-center justify-center">
      <div>
        {/* phone button *
        <button>
          <BsTelephone size={30} className="text-gray-400" onClick={handleCallButton} />
        </button>
        {callEstablished && (
          <div>
            <audio srcObject={localStream} autoPlay />
            <audio srcObject={peer.stream} autoPlay />
          </div>
        )}

      </div>
      <BsThreeDotsVertical size={35} />
    </div>
  </div>
  <div className="h-auto w-full bg-blue-200 flex flex-col gap-5 py-10 px-5 overflow-y-auto no-scrollbar">
    {/* Messages *

    {messages.map((msg, index) => (
      <div key={index} className={`w-full flex items-center justify-${msg.sender === senderId ? 'end' : 'tart'}`}>
        {msg.sender === senderId ? (
          <ChatBubbleRight text={msg.text} time={msg.time} fileUrl={msg.fileUrl} voiceUrl={msg.voiceUrl} />
        ) : (
          <ChatBubbleLeft text={msg.text} time={msg.time} fileUrl={msg.fileUrl} voiceUrl={msg.voiceUrl} />
        )}
      </div>
    ))}
  </div>
  <div className="h-auto w-[95%] flex flex-row gap-2">
    <div className="flex flex-row justify-end items-center gap-3">


    </div>
    <div className="flex flex-row gap-2 items-center justify-center w-[95%] border border-gray-300 rounded-full px-5">
      <input
        type="file"
        id="file-input"
        accept="image/*, video/*"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
      <label htmlFor="file-input" className="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 21h-5a4.5 4.5 0 01-4.5-4.5v-9A4.5 4.5 0 019.5 3h5a4.5 4.5 0 014.5 4.5v9a4.5 4.5 0 01-4.5 4.5z"></path>
          <path d="M9 10.5L12 13.5 15 10.5"></path>
        </svg>
      </label>
      <input
        type="text"
        className="h-12 w-full border-none outline-none rounded-full p-2"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <VscDeviceCamera size={30} className="text-gray-400 cursor-pointer" onClick={openCamera} />
      <div className="rounded-full bg-white h-14 border border-gray-300 px-14 relative">
        <div className="absolute right-10 top-3">
          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onMouseLeave={handleMouseLeave}
            className="bg-gray-200 p-2 rounded-full"
          >
            <TiMicrophoneOutline size={20} />
          </button>

        </div>
      </div>
      <FiSend size={30} className="text-blue-500 cursor-pointer" onClick={handleSendMessage} />
    </div>
    {audioURL && (
      <audio controls>
        <source src={audioURL} type="audio/webm" />
      </audio>
    )}

  </div>
</div>
        </div >
      </div >
    </>
  );
}

{/*
  useEffect(() => {
    const senderId = '665053d88ad154db13e18bc8'; // Example sender ID
    const receiverId = '66546cc9f620502d4ce0331f'; // Example receiver ID
    fetch(`http://localhost:5000/api/chat/messages?sender=${senderId}&receiver=${receiverId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched messages:', data); // Add this line to inspect data
        setMessages(data.map(msg => ({ ...msg, received: msg.sender !== senderId })));
      });

    socket.on('receiveMessage', (message) => {
      console.log('Received message:', message); // Add this line to inspect incoming messages
      setMessages((prevMessages) => [...prevMessages, { ...message, received: message.sender !== senderId }]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);
  */}

{/*
  const handleSendMessage = () => {
    const senderId = '665053d88ad154db13e18bc8'; // Example sender ID
    const receiverId = '66546cc9f620502d4ce0331f'; // Example receiver ID
    const senderModel = 'TeacherDetail';
    const receiverModel = 'TeacherDetail';

    if (selectedFile) {
      const newMessage = { fileUrl: URL.createObjectURL(selectedFile), time: new Date().toLocaleTimeString(), received: false, sender: senderId, senderModel, receiver: receiverId, receiverModel };
      socket.emit('sendMessage', newMessage);
      fetch(${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage)
      });
      setSelectedFile(null);
    } else if (message) {
      const newMessage = { text: message, time: new Date().toLocaleTimeString(), received: false, sender: senderId, senderModel, receiver: receiverId, receiverModel };
      socket.emit('sendMessage', newMessage);
      fetch(${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage)
      });
      setMessage('');
    } else if (recordedAudio) {
      const formData = new FormData();
      formData.append('voice', recordedAudio, 'voiceMessage.webm');
      fetch(${process.env.NEXT_PUBLIC_API_SERVER_URL}/upload-voice', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          const newMessage = { voiceUrl: data.voiceUrl, time: new Date().toLocaleTimeString(), received: false, sender: senderId, senderModel, receiver: receiverId, receiverModel };
          socket.emit('sendMessage', newMessage);
          fetch(${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/chat/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMessage)
          });
          setRecordedAudio(null);
        });
    }
  };
  */}


{/*
// pages/teacherspanel/Chats.js
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Image from 'next/image';
import { BsTelephone, BsThreeDotsVertical } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { FiSend } from 'react-icons/fi';
import { TiMicrophoneOutline } from 'react-icons/ti';
import { VscDeviceCamera } from 'react-icons/vsc';
import community from './community.png';
import ChatBubbleLeft from './ChatBubbleLeft';
import ChatBubbleRight from './ChatBubbleRight';

const socket = io(${process.env.NEXT_PUBLIC_API_SERVER_URL}'); // Update the server URL

export default function Chats() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [showFileOptions, setShowFileOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [audioURL, setAudioURL] = useState('');
  const [recordedAudio, setRecordedAudio] = useState(null);


  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, { ...message, received: true }]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const handleSendMessage = () => {
    if (selectedFile) {
      const newMessage = { fileUrl: URL.createObjectURL(selectedFile), time: new Date().toLocaleTimeString(), received: false };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit('sendMessage', newMessage);
      setSelectedFile(null);
    } else if (message) {
      const newMessage = { text: message, time: new Date().toLocaleTimeString(), received: false };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit('sendMessage', newMessage);
      setMessage('');
    } else if (recordedAudio) {
      const formData = new FormData();
      formData.append('voice', recordedAudio, 'voiceMessage.webm');

      fetch(${process.env.NEXT_PUBLIC_API_SERVER_URL}/upload-voice', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const newMessage = { voiceUrl: data.voiceUrl, time: new Date().toLocaleTimeString(), received: false };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          socket.emit('sendMessage', newMessage);
          setRecordedAudio(null);
        })
        .catch(error => {
          console.error('Error uploading voice message:', error);
        });

    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileOptionsToggle = () => {
    setShowFileOptions(!showFileOptions);
  };

  const startRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          setAudioURL(URL.createObjectURL(event.data));
          setRecordedAudio(event.data); // Store the recorded audio blob
        };
        mediaRecorderRef.current.start();
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleMouseLeave = () => {
    stopRecording();
    if (recordedAudio) {
      const formData = new FormData();
      formData.append('voice', recordedAudio, 'voiceMessage.webm');

      fetch(${process.env.NEXT_PUBLIC_API_SERVER_URL}/upload-voice', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const newMessage = { voiceUrl: data.voiceUrl, time: new Date().toLocaleTimeString(), received: false };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          socket.emit('sendMessage', newMessage);
          setRecordedAudio(null);
        })
        .catch(error => {
          console.error('Error uploading voice message:', error);
        });
    }
  };


  const openCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        video.addEventListener('loadedmetadata', () => {
          document.body.appendChild(video);
        });
      });
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col gap-5 pl-10 py-10">
              <div className="h-12 w-full flex flex-row items-center justify-between">
                <div className="flex flex-row gap-6">
                  <h1 className="text-black text-lg font-medium">Total Students</h1>
                </div>
                <div className="flex flex-row gap-2">
                  <h1 className="text-black text-lg font-medium">Filter</h1>
                  <select className="h-8 w-28 border border-gray-500 outline-none rounded-lg p-1">
                    <option>Select</option>
                  </select>
                </div>
              </div>

              <div className="w-full h-screen flex flex-row">
                {/* left side *
          <div className="h-auto w-[40%] flex flex-col gap-5">
            <div className="h-10 w-[95%] border border-gray-300 rounded-sm flex flex-row items-center gap-2 px-5 py-5">
              <CiSearch size={20} />
              <h1>Search</h1>
            </div>
            <div className="h-auto py-5 w-[95%] border border-blue-300 flex flex-col gap-5 rounded-xl px-5">
              <h1 className="text-black text-lg font-bold">Group</h1>
              {/* Repeat the following block for each group *
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Class Community
                  </h1>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 className="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
            </div>
            <div className="h-auto py-5 rounded-xl w-[95%] border border-blue-300 flex flex-col gap-5 px-5">
              <h1 className="text-black text-lg font-bold">People</h1>
              {/* Repeat the following block for each person *
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Jay Kumar
                  </h1>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xs text-green-500">Online Now</h1>
                </div>
              </div>
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Kran Kumar
                  </h1>
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 className="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Kamlesh Kumar
                  </h1>
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 className="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Jyoti Gupta
                  </h1>
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 className="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">Nikita</h1>
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 class="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
            </div>
          </div>

          {/* right side *
          <div className="h-auto w-[60%] flex flex-col gap-5">
            <div className="h-[91px] w-[95%] flex flex-row items-center justify-between">
              <div className="flex flex-row gap-5 items-center justify-center">
                <Image src={community} />
                <h1 className="text-black text-md font-semibold">Jay Kumar</h1>
              </div>
              <div className="flex flex-row gap-3 items-center justify-center">
                <BsTelephone size={30} className="text-gray-400" />
                <BsThreeDotsVertical size={35} />
              </div>
            </div>
            <div className="h-auto w-full bg-blue-200 flex flex-col gap-5 py-10 px-5">
              {/* Messages *

              {messages.map((msg, index) => (
                <div key={index} className={`w-full flex items-center justify-${msg.received ? 'end' : 'start'}`}>
                  {msg.received ? (
                    <ChatBubbleRight text={msg.text} time={msg.time} fileUrl={msg.fileUrl}
                      voiceUrl={msg.voiceUrl} />
                  ) : (
                    <ChatBubbleLeft text={msg.text} time={msg.time} fileUrl={msg.fileUrl}
                      voiceUrl={msg.voiceUrl} />
                  )}
                </div>
              ))}
            </div>
            <div className="h-auto w-[95%] flex flex-row gap-2">
              <div className="flex flex-row justify-end items-center gap-3">


              </div>
              <div className="flex flex-row gap-2 items-center justify-center w-[95%] border border-gray-300 rounded-full px-5">
                <input
                  type="file"
                  id="file-input"
                  accept="image/*, video/*"
                  style={{ display: 'none' }}
                  onChange={handleFileSelect}
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 21h-5a4.5 4.5 0 01-4.5-4.5v-9A4.5 4.5 0 019.5 3h5a4.5 4.5 0 014.5 4.5v9a4.5 4.5 0 01-4.5 4.5z"></path>
                    <path d="M9 10.5L12 13.5 15 10.5"></path>
                  </svg>
                </label>
                <input
                  type="text"
                  className="h-12 w-full border-none outline-none rounded-full p-2"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <VscDeviceCamera size={30} className="text-gray-400 cursor-pointer" onClick={openCamera} />
                <div className="rounded-full bg-white h-14 border border-gray-300 px-14 relative">
                  <div className="absolute right-10 top-3">
                    <button
                      onMouseDown={startRecording}
                      onMouseUp={stopRecording}
                      onMouseLeave={handleMouseLeave}
                      className="bg-gray-200 p-2 rounded-full"
                    >
                      <TiMicrophoneOutline size={20} />
                    </button>

                  </div>
                </div>
                <FiSend size={30} className="text-blue-500 cursor-pointer" onClick={handleSendMessage} />
              </div>
              {audioURL && (
                <audio controls>
                  <source src={audioURL} type="audio/webm" />
                </audio>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}


{/*
// pages/teacherspanel/Chats.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Image from 'next/image';
import { BsTelephone, BsThreeDotsVertical } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { FiSend } from 'react-icons/fi';
import { TiMicrophoneOutline } from 'react-icons/ti';
import { VscDeviceCamera } from 'react-icons/vsc';
import community from './community.png';
import ChatBubbleLeft from './ChatBubbleLeft';
import ChatBubbleRight from './ChatBubbleRight';

const socket = io(${process.env.NEXT_PUBLIC_API_SERVER_URL}'); // Update the server URL

export default function Chats() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, { ...message, received: true }]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const handleSendMessage = () => {
    const newMessage = { text: message, time: new Date().toLocaleTimeString(), received: false };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket.emit('sendMessage', newMessage);
    setMessage('');
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col gap-5 pl-10 py-10">
        <div className="h-12 w-full flex flex-row items-center justify-between">
          <div className="flex flex-row gap-6">
            <h1 className="text-black text-lg font-medium">Total Students</h1>
          </div>
          <div className="flex flex-row gap-2">
            <h1 className="text-black text-lg font-medium">Filter</h1>
            <select className="h-8 w-28 border border-gray-500 outline-none rounded-lg p-1">
              <option>Select</option>
            </select>
          </div>
        </div>

        <div className="w-full h-screen flex flex-row">
          {/* left side *
          <div className="h-auto w-[40%] flex flex-col gap-5">
            <div className="h-10 w-[95%] border border-gray-300 rounded-sm flex flex-row items-center gap-2 px-5 py-5">
              <CiSearch size={20} />
              <h1>Search</h1>
            </div>
            <div className="h-auto py-5 w-[95%] border border-blue-300 flex flex-col gap-5 rounded-xl px-5">
              <h1 className="text-black text-lg font-bold">Group</h1>
              {/* Repeat the following block for each group *
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Class Community
                  </h1>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 className="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
            </div>
            <div className="h-auto py-5 rounded-xl w-[95%] border border-blue-300 flex flex-col gap-5 px-5">
              <h1 className="text-black text-lg font-bold">People</h1>
              {/* Repeat the following block for each person *
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Jay Kumar
                  </h1>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xs text-green-500">Online Now</h1>
                </div>
              </div>
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Kran Kumar
                  </h1>
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 className="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Kamlesh Kumar
                  </h1>
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 className="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Jyoti Gupta
                  </h1>
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 className="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">Nikita</h1>
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 className="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
            </div>
          </div>

          {/* right side *
          <div className="h-auto w-[60%] flex flex-col gap-5">
            <div className="h-[91px] w-[95%] flex flex-row items-center justify-between">
              <div className="flex flex-row gap-5 items-center justify-center">
                <Image src={community} />
                <h1 className="text-black text-md font-semibold">Jay Kumar</h1>
              </div>
              <div className="flex flex-row gap-3 items-center justify-center">
                <BsTelephone size={30} className="text-gray-400" />
                <BsThreeDotsVertical size={35} />
              </div>
            </div>
            <div className="h-auto w-full bg-blue-200 flex flex-col gap-5 py-10 px-5">
              {messages.map((msg, index) => (
                <div key={index} className={`w-full flex items-center justify-${msg.received ? 'end' : 'start'}`}>
                  {msg.received ? (
                    <ChatBubbleRight text={msg.text} time={msg.time} />
                  ) : (
                    <ChatBubbleLeft text={msg.text} time={msg.time} />
                  )}
                </div>
              ))}

              <div className="w-full gap-10 flex">
                <div className="flex items-center justify-center w-full relative">
                  <button className="h-7 w-7 rounded-full border border-gray-400 flex items-center justify-center text-gray-400 absolute left-10 text-2xl font-normal">
                    +
                  </button>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full rounded-full bg-white h-14 border border-gray-300 px-20"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="absolute right-20">
                    <VscDeviceCamera size={30} className="text-gray-400" />
                  </div>
                  <div className="absolute right-8" onClick={handleSendMessage}>
                    <FiSend size={25} className="text-blue-500" />
                  </div>
                </div>
                <div className="rounded-full bg-white h-14 border border-gray-300 px-14 relative">
                  <div className="absolute right-10 top-3">
                    <TiMicrophoneOutline size={30} className="text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}


{/*import Image from "next/image";
import { BsTelephone, BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FiSend } from "react-icons/fi";
import { TiMicrophoneOutline } from "react-icons/ti";
import { VscDeviceCamera } from "react-icons/vsc";
import ChatBubbleLeft from "./ChatBubbleLeft";
import ChatBubbleRight from "./ChatBubbleRight";
import community from "./community.png";

export default function chats() {
  return (
    <>
      <div className="h-screen w-full flex flex-col gap-5 pl-10 py-10  ">
        <div className="h-12 w-full flex flex-row items-center justify-between">
          <div className="flex flex-row gap-6">
            <h1 className="text-black text-lg font-medium">Total Students</h1>
          </div>
          <div className="flex flex-row gap-2">
            <h1 className="text-black text-lg font-medium">Filter</h1>
            <select className="h-8 w-28 border border-gray-500 outline-none rounded-lg p-1 ">
              <option>Select</option>
            </select>
          </div>
        </div>

        <div className="w-full h-screen flex flex-row">
          {/* left side 
          <div className="h-auto w-[40%]  flex flex-col gap-5">
            <div className="h-10 w-[95%] border border-gray-300 rounded-sm flex flex-row items-center gap-2 px-5 py-5">
              <CiSearch size={20} />
              <h1>Search</h1>
            </div>
            <div className="h-auto py-5 w-[95%] border border-blue-300 flex flex-col gap-5 rounded-xl  px-5">
              <h1 className="text-black text-lg font-bold">Group</h1>
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Class Community
                  </h1>
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 className="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Class Community
                  </h1>
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 className="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Class Community
                  </h1>
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 className="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
            </div>
            <div className="h-auto py-5 rounded-xl w-[95%] border border-blue-300 flex flex-col gap-5  px-5">
              <h1 className="text-black text-lg font-bold">People</h1>
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Jay Kumar
                  </h1>
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-xs text-green-500">Online Now</h1>
                </div>
              </div>
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Kran Kumar
                  </h1>
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 className="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Kamlesh Kumar
                  </h1>
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 className="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">
                    Jyoti Gupta
                  </h1>
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 className="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
              <div className="h-[62px] w-[90%] flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={community} />
                  <h1 className="text-black text-md font-semibold">Nikita</h1>
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-xs text-gray-500">Last Seen</h1>
                  <h1 className="text-xs text-gray-500">10.00AM</h1>
                </div>
              </div>
            </div>
          </div>
          {/* right side *
          <div className="h-auto w-[60%]  flex flex-col  gap-5 ">
            <div className="h-[91px] w-[95%] flex flex-row items-center justify-between">
              <div className="flex flex-row gap-5 items-center justify-center">
                <Image src={community} />
                <h1 className="text-black text-md font-semibold">Jay Kumar</h1>
              </div>
              <div className="flex flex-row gap-3 items-center justify-center">
                <BsTelephone size={30} className="text-gray-400" />
                <BsThreeDotsVertical size={35} />
              </div>
            </div>
            <div className="h-auto w-full bg-blue-200 flex flex-col gap-5 py-10 px-5">
              <div className="w-full flex items-center justify-start">
                <ChatBubbleLeft
                  text={"    Hi, How are you ?"}
                  time={"Today, 10.30 pm"}
                />
              </div>
              <div className="w-full flex items-center justify-end">
                <ChatBubbleRight
                  text={"    Fine. WAU ?"}
                  time={"Today, 10.30 pm"}
                />
              </div>
              <div className="w-full flex items-center justify-start">
                <ChatBubbleLeft
                  text={"  Good. What are you doing ?"}
                  time={"Today, 10.31 pm"}
                />
              </div>
              <div className="w-full flex items-center justify-end">
                <ChatBubbleRight text={"  Study?"} time={"Today, 10.32 pm"} />
              </div>
              <div className="w-full flex items-center justify-start">
                <ChatBubbleLeft
                  text={"  I already finished my study"}
                  time={"Today, 10.32 pm"}
                />
              </div>
              <div className="w-full flex items-center justify-end">
                <ChatBubbleRight text={"  Good "} time={"Today, 10.33 pm"} />
              </div>

              <div className="w-full gap-10 flex ">
                <div className="flex items-center justify-center w-full relative">
                  <button className="h-7 w-7 rounded-full border border-gray-400 flex items-center justify-center text-gray-400 absolute left-10 text-2xl font-normal">
                    +
                  </button>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full rounded-full bg-white h-14 border border-gray-300 px-20"
                  />
                  <div className="absolute right-20">
                    <VscDeviceCamera size={30} className="text-gray-400  " />
                  </div>
                  <div className="absolute right-8">
                    <FiSend size={25} className="text-blue-500  " />
                  </div>
                </div>
                <div className="rounded-full bg-white h-14 border border-gray-300 px-14 relative ">
                  <div className="absolute right-10 top-3">
                    <TiMicrophoneOutline
                      size={30}
                      className="text-gray-600  "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
}

<div className="flex-1 bg-blue-400 p-4 overflow-y-scroll">
            {messages.map((msg, index) =>
              msg.senderId === senderId ? (
                <ChatBubbleLeft key={index} text={msg.text} time={msg.time} fileUrl={msg.fileUrl}
                  voiceUrl={msg.voiceUrl} />
              ) : (
                <ChatBubbleRight key={index} text={msg.text} time={msg.time} fileUrl={msg.fileUrl}
                  voiceUrl={msg.voiceUrl} />
              )
            )}
          </div>
  */}
