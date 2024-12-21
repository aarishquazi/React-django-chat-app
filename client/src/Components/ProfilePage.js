import React, { useEffect, useState } from "react";
import api from "../api";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const navigate = useNavigate();
  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get("/profile/"); // Replace with your API endpoint
        // console.log(response.data);
        setUser(response.data);
      } catch (error) {
        toast.error("Could not fetch user data");
        navigate("/login");
      }
    };

    fetchUserDetails();
  }, []);

  // Handle profile picture upload
  const handleProfilePicChange = (event) => {
    setNewProfilePic(event.target.files[0]);
  };

  const handleProfilePicUpdate = async () => {
    if (newProfilePic) {
      const formData = new FormData();
      formData.append("profile_pic", newProfilePic);

      try {
        const response=await api.put("/profile/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
        setUser(response.data);
        setNewProfilePic(null);
        toast.success("Profile picture updated successfully!");
      } catch (error) {
        console.error("Error updating profile picture:", error);
        toast.error("Failed to update profile picture.");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <button onClick={() => (navigate('/chatroom'))}>
        <SlArrowLeft />
        </button>
        <h1 className="text-2xl font-bold text-center mb-6">User Profile</h1>
        {user ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <img
                src={user.profile_pic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-24 h-24 rounded-full shadow-md"
              />
              <label
                htmlFor="profilePic"
                className="mt-3 text-sm font-medium text-blue-500 cursor-pointer"
              >
                Change Profile Picture
              </label>
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
              {newProfilePic && (
                <button
                  onClick={handleProfilePicUpdate}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Update Picture
                </button>
              )}
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Username</label>
              <p className="bg-gray-100 rounded-lg px-4 py-2">{user.username}</p>
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Name</label>
              <p className="bg-gray-100 rounded-lg px-4 py-2">{user.name}</p>
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <p className="bg-gray-100 rounded-lg px-4 py-2">{user.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
