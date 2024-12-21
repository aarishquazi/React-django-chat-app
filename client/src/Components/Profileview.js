import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import api from '../api';
import { SlArrowLeft } from "react-icons/sl";
import { ThreeDot } from "react-loading-indicators";

const Profileview = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [username, Setusername] = useState(params.username);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (params.username) {
            console.log(params.username);
            Setusername(params.username);
        }
    }, [params.username]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                console.log(username);
                const response = await api.get(`profile/${username}/`); // Profile API endpoint
                console.log(response.data);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
                navigate("/login"); // Redirect to login on error
            }
        };
        fetchUserDetails();
    }, [username]);
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <ThreeDot variant="bounce" color="#3171cc" size="medium" text="" textColor="" />
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <button onClick={() => (navigate('/chatroom'))}>
                    <SlArrowLeft />
                </button>
                <h1 className="text-2xl font-bold text-center mb-6">{user.name}'s Profile</h1>
                <div className="space-y-4">
                    <div className="flex flex-col items-center">
                        <img
                            src={user.profile_pic || "https://via.placeholder.com/150"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full shadow-md"
                        />
                    </div>
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
        </div>
    )
}

export default Profileview