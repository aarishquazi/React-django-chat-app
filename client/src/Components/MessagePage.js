// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom"; 
// import api from "../api";
// import { ACCESS_TOKEN, USER } from "../constant";
// import toast from 'react-hot-toast';

// const MessagePage = () => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [user, setUser] = useState(null);
//   const [ws, setWs] = useState(null);
//   const [roomname, setRoomname] = useState(""); 
//   const [room, setRoom] = useState(null);

//   // Fetch user details from API
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await api.get("/profile/"); // Assuming your profile endpoint is "/profile/"
//         console.log(response.data);
//         setUser(response.data); // Set user details
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//         navigate("/login"); // Redirect to login if fetching fails
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   // Fetch roomname from URL params
//   useEffect(() => {
//     if (params.roomname) {
//       setRoomname(params.roomname); // Set roomname from URL params
//     }
//   }, [params.roomname]);

//   // Fetch room details from API
//   useEffect(() => {
//     const fetchRoomDetails = async () => {
//       if (roomname) {
//         try {
//           const response = await api.get(`/rooms/`);
//           const roomDetails = response.data.find((room) => room.name === roomname);
//           setRoom(roomDetails);
//         } catch (error) {
//           console.error("Error fetching room details:", error);
//         }
//       }
//     };

//     fetchRoomDetails();
//   }, [roomname]);

//   // Initialize WebSocket connection
//   useEffect(() => {
//     if (roomname && user) {
//       // const token = ACCESS_TOKEN;
//       const socketUrl = `ws://127.0.0.1:8000/ws/chat/room/${roomname}/`;
//       const socket = new WebSocket(socketUrl);

//       socket.onopen = () => {
//         if (user.name) {
//           toast(`Congratulations ${user.name}, Connection has been established`);
//         } else {
//           console.error("User name is missing");
//         }
//       };

//       socket.onmessage = (event) => {
//         const data = JSON.parse(event.data);
//         setMessages((prev) => [...prev, { username: data.username, message: data.message }]);
//       };

//       socket.onclose = (e) => {
//         console.log("WebSocket closed", e);
//       };

//       socket.onerror = (e) => {
//         console.error("WebSocket error", e);
//       };

//       setWs(socket);

//       // Cleanup on component unmount
//       return () => {
//         socket.close();
//       };
//     }
//   }, [roomname, user]);

//   // Handle sending message
//   const handleSendMessage = async () => {
//     if (ws && inputMessage.trim() && user) {
//       ws.send(JSON.stringify({ message: inputMessage, username: user.username }));

//       // Send message via WebSocket

//       // Persist message via API

//         setInputMessage(""); // Clear input field after sending
//     } else {
//       console.log("User not authenticated or input message is empty");
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <header className="p-4 bg-blue-500 text-white text-center text-lg font-semibold">
//         Chat Room: {room ? room.name : "Loading..."}
//       </header>

//       {/* Messages */}
//       <div className="flex-grow p-4 overflow-y-auto bg-white">
//         {messages.length === 0 ? (
//           <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
//         ) : (
//           messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`p-2 my-2 rounded-lg ${
//                 msg.username === user?.username
//                   ? "bg-blue-500 text-white self-end"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//               style={{ maxWidth: "75%" }}
//             >
//               <p className="font-semibold">{msg.username}</p>
//               <p>{msg.message}</p>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Input */}
//       <div className="p-4 bg-gray-100 border-t">
//         <div className="flex items-center space-x-2">
//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//           />
//           <button
//             onClick={handleSendMessage}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessagePage;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import api from "../api";
import toast from "react-hot-toast";

const MessagePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [user, setUser] = useState(null);
  const [ws, setWs] = useState(null);
  const [roomname, setRoomname] = useState("");
  const [room, setRoom] = useState(null);

  // Fetch user details from API
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get("/profile/"); // Profile API endpoint
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/login"); // Redirect to login on error
      }
    };
    fetchUserDetails();
  }, [navigate]);

  // Set roomname from URL params
  useEffect(() => {
    if (params.roomname) {
      setRoomname(params.roomname);
    }
  }, [params.roomname]);

  // Fetch room details from API
  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (roomname) {
        try {
          const response = await api.get(`/rooms/`); // API endpoint to get all rooms
          const roomDetails = response.data.find((room) => room.name === roomname);
          setRoom(roomDetails);
        } catch (error) {
          console.error("Error fetching room details:", error);
        }
      }
    };
    fetchRoomDetails();
  }, [roomname]);

  // Initialize WebSocket connection
  useEffect(() => {
    if (roomname && user) {
      const fetchMessages = async () => {
        try {
          const response = await api.get(`/room/${roomname}/messages/`); // API to fetch room messages
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();

      const socketUrl = `ws://127.0.0.1:8000/ws/chat/room/${roomname}/`;
      const socket = new WebSocket(socketUrl);

      socket.onopen = () => {
        toast.success(`Welcome ${user.name}, connection established.`);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("on message data");
        console.log(data);
        setMessages((prev) => [
          ...prev,
          { username: data.username, message: data.message, profile_pic: data.profile_pic },
        ]);
      };

      socket.onclose = () => {
        console.log("WebSocket closed.");
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      setWs(socket);

      // Cleanup on unmount
      return () => {
        socket.close();
      };
    }
  }, [roomname, user]);

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN"); // Clear token
    navigate("/login"); // Redirect to login
  };

  // Handle message send
  const handleSendMessage = () => {
    if (ws && inputMessage.trim() && user) {
      const newMessage = {
        message: inputMessage,
        username: user.username,
        profile_pic: user.profile_pic,
      };
  
      ws.send(JSON.stringify(newMessage)); // Send message to WebSocket
      setInputMessage(""); // Clear input field
    } else {
      console.error("Message is empty or user is not authenticated.");
    }
  };
  

  // Handle "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="p-4 bg-blue-600 text-white text-lg flex justify-between items-center">
        <button onClick={() => navigate("/chatroom")}>
          <SlArrowLeft />
        </button>
        <div className="text-center w-full">Chat Room: {room ? room.name : "Loading..."}</div>
        <button
          onClick={handleLogout}
          className="ml-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
        >
          Logout
        </button>
      </header>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto bg-white">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start mb-4 ${
                msg.username === user?.username ? "justify-end" : "justify-start"
              }`}
            >
              {msg.username !== user?.username && (
                <button onClick={()=>(navigate(`/profile/${msg.username}`))}>
                <img
                  src={msg.profile_pic || "https://via.placeholder.com/40"}
                  alt="User DP"
                  className="w-10 h-10 rounded-full mr-2"
                />
                </button>
              )}
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.username === user?.username
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p className="font-semibold">{msg.username}</p>
                <p>{msg.message}</p>
              </div>
              {msg.username === user?.username && (
                <button onClick={()=>(navigate(`/profile/${msg.username}`))}>
                <img
                  src={msg.profile_pic || "https://via.placeholder.com/40"}
                  alt="User DP"
                  className="w-10 h-10 rounded-full ml-2"
                />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-100 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
