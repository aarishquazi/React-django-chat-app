// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const chatroomlist = () => {
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       const response = await axios.get('/api/rooms/');
//       setRooms(response.data);
//     };

//     fetchRooms();
//   }, []);

//   return (
//     <div>
//       <h1>Available Chat Rooms</h1>
//       <ul>
//         {rooms.map((room) => (
//           <li key={room.name}>
//             <Link to={`/room/${room.name}`}>{room.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default chatroomlist;
// import React, { useEffect, useState } from 'react';
// import {useNavigate} from 'react-router-dom';
// import api from '../api';
// import toast from 'react-hot-toast';

// function ChatroomList({ route }) {
//   const [rooms, setRooms] = useState([]);
//   const [newRoomName, setNewRoomName] = useState("");
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate()
//   // const [user, setUser] = useState(JSON.parse(localStorage.getItem(user)) || null);
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
//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const response = await api.get(route);
//         console.log(response.data);
//         setRooms(response.data);
//         console.log(rooms);
//       } catch (error) {
//         console.error("Failed to fetch chat rooms:", error);
//       }
//     };
//     fetchRooms();
//   }, []);
//   const handleLogout = () => {
//     // Clear tokens or user data if necessary
//     localStorage.removeItem("ACCESS_TOKEN");
//     navigate("/login"); // Navigate to login page
//   };

//   const handleCreateRoom = async () => {
//     if (!newRoomName.trim()) {
//       toast.error("Chatroom name cannot be empty!");
//       return;
//     }
//     try {
//       const response = await api.post("/rooms/", { name: newRoomName });
//       console.log(response.data)
//       setRooms((prev) => [...prev, response.data]); // Add the new room to the list
//       setNewRoomName("");
//       toast.success("Chatroom created successfully!");
//     } catch (error) {
//       console.error("Failed to create chatroom:", error);
//       toast.error("Error in creating chatroom");
//     }
//   };

//   return (
//   <div className="bg-gray-100 min-h-screen">
//   {/* User Profile Section */}
//   <div className="bg-white shadow-md p-4 flex items-center justify-between">
//     <button onClick={() => navigate('/profile')}>
//       {user ? (
//         <div className="flex items-center space-x-4">
//           <img
//             src={user.profile_pic || "https://via.placeholder.com/50"}
//             alt="Profile"
//             className="w-12 h-12 rounded-full object-cover"
//           />
//           <div>
//             <h2 className="text-lg font-semibold">{user.username}</h2>
//           </div>
//         </div>
//       ) : (
//         <p className="text-gray-500">Loading profile...</p>
//       )}
//     </button>
//     <button
//       onClick={handleLogout}
//       className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//     >
//       Logout
//     </button>
//   </div>

//   {/* Create Chatroom Section */}
//   <div className="max-w-2xl mx-auto mt-6 bg-white rounded-lg shadow-lg p-6">
//     <h3 className="text-lg font-bold uppercase text-gray-600 border-b pb-2 mb-4">
//       Create a Chatroom
//     </h3>
//     <div className="flex items-center space-x-2">
//       <input
//         type="text"
//         value={newRoomName}
//         onChange={(e) => setNewRoomName(e.target.value)}
//         placeholder="Enter chatroom name..."
//         className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
//       />
//       <button
//         onClick={handleCreateRoom}
//         className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//       >
//         Create
//       </button>
//     </div>
//   </div>

//   {/* Chatroom List */}
//   <div className="max-w-2xl mx-auto mt-6 bg-white rounded-lg shadow-lg p-6">
//     <h3 className="text-lg font-bold uppercase text-gray-600 border-b pb-2 mb-4">
//       Available Chatrooms
//     </h3>
//     <div className="space-y-4">
//       {rooms.length > 0 ? (
//         rooms.map(({ name, created_at }) => (
//           <button
//             key={name}
//             className="w-full text-left p-4 bg-gray-50 rounded-lg hover:shadow-md hover:bg-indigo-50 transition-all focus:outline-none"
//             onClick={() => navigate(`room/${name}`)}
//           >
//             <h4 className="text-lg font-semibold text-indigo-700">{name}</h4>
//             <p className="text-sm text-gray-500">
//               Created at: {new Date(created_at).toLocaleString()}
//             </p>
//           </button>
//         ))
//       ) : (
//         <p className="text-center text-gray-500">No chatrooms available</p>
//       )}
//     </div>
//   </div>
// </div>
//   )
// }

// export default ChatroomList;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators"; // Import your loader component
import api from "../api";
import toast from "react-hot-toast";

function ChatroomList({ route }) {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get("/profile/");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/login");
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await api.get(route);
        setRooms(response.data);
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    // Fetch data in parallel
    Promise.all([fetchUserDetails(), fetchRooms()])
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false)); // Stop loading after data is fetched
  }, [route, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    navigate("/login");
  };

  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) {
      toast.error("Chatroom name cannot be empty!");
      return;
    }
    try {
      const response = await api.post("/rooms/", { name: newRoomName });
      setRooms((prev) => [...prev, response.data]);
      setNewRoomName("");
      toast.success("Chatroom created successfully!");
    } catch (error) {
      console.error("Failed to create chatroom:", error);
      toast.error("Error in creating chatroom");
    }
  };

  if (loading) {
    // Show loading indicator while fetching data
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ThreeDot variant="bounce" color="#3171cc" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* User Profile Section */}
      <div className="bg-white shadow-md p-4 flex items-center justify-between">
        <button onClick={() => navigate("/profile")}>
          {user ? (
            <div className="flex items-center space-x-4">
              <img
                src={user.profile_pic || "https://via.placeholder.com/50"}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{user.username}</h2>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Loading profile...</p>
          )}
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Create Chatroom Section */}
      <div className="max-w-2xl mx-auto mt-6 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold uppercase text-gray-600 border-b pb-2 mb-4">
          Create a Chatroom
        </h3>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="Enter chatroom name..."
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
          />
          <button
            onClick={handleCreateRoom}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Create
          </button>
        </div>
      </div>

      {/* Chatroom List */}
      <div className="max-w-2xl mx-auto mt-6 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold uppercase text-gray-600 border-b pb-2 mb-4">
          Available Chatrooms
        </h3>
        <div className="space-y-4">
          {rooms.length > 0 ? (
            rooms.map(({ name, created_at }) => (
              <button
                key={name}
                className="w-full text-left p-4 bg-gray-50 rounded-lg hover:shadow-md hover:bg-indigo-50 transition-all focus:outline-none"
                onClick={() => navigate(`room/${name}`)}
              >
                <h4 className="text-lg font-semibold text-indigo-700">{name}</h4>
                <p className="text-sm text-gray-500">
                  Created at: {new Date(created_at).toLocaleString()}
                </p>
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500">No chatrooms available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatroomList;
