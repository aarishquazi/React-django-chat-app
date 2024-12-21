// import React, { useState } from 'react'
// // import { IoClose } from "react-icons/io5";
// import toast from 'react-hot-toast';
// import { PiUserCircle } from "react-icons/pi";
// import { Link, useNavigate } from 'react-router-dom';
// import { ACCESS_TOKEN } from "../constant";
// import api from '../api'

// const Login = ({route}) => {
//     // route="/api/user/register/";
//     // method="register";

//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const navigate = useNavigate()


//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         e.stopPropagation()
//         try{
//         const res = await api.post(route, { username, password })
//         localStorage.setItem(ACCESS_TOKEN, res.data.access);
//         console.log(res.data.access);
//         // localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
//         toast.success("Login Success")
//         navigate("/chatroom")
//         }
//         catch(error){
//             toast.error("Invalid Username or Password")
//         }
//     }
//     return (
//         <div className='mt-5'>
//             <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>

//                 <div className='w-fit mx-auto mb-2'>
//                     <PiUserCircle
//                         size={80}
//                     />
//                 </div>

//                 <h3>Welcome to Chat app!</h3>

//                 <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>


//                     <div className='flex flex-col gap-1'>
//                         <label htmlFor='username'>User Name :</label>
//                         <input
//                             type='text'
//                             id='username'
//                             name='username'
//                             placeholder='enter your username'
//                             className='bg-slate-100 px-2 py-1 focus:outline-primary'
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className='flex flex-col gap-1'>
//                 <label htmlFor='password'>Password :</label>
//                 <input
//                   type='password'
//                   id='password'
//                   name='password'
//                   placeholder='enter your password' 
//                   className='bg-slate-100 px-2 py-1 focus:outline-primary'
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//                     <button
//                         className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
//                     >
//                         Login
//                     </button>
//                 </form>
//                 <p className='my-3 text-center'>New User ? <Link to={"/register"} className='hover:text-primary font-semibold'>Register</Link></p>
//             </div>
//         </div>
//     )
// }


// export default Login

import React, { useState } from "react";
import toast from "react-hot-toast";
import { PiUserCircle } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators"; // Import your loading indicator
import { ACCESS_TOKEN } from "../constant";
import api from "../api";

const Login = ({ route }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true); // Start loading
        try {
            const res = await api.post(route, { username, password });
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            toast.success("Login Success");
            navigate("/chatroom");
        } catch (error) {
            toast.error("Invalid Username or Password");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="mt-5">
            <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
                <div className="w-fit mx-auto mb-2">
                    <PiUserCircle size={80} />
                </div>

                <h3>Welcome to Chat app!</h3>

                {loading ? ( // Conditionally render the loading indicator
                    <div className="min-h-screen flex items-center justify-center">
                        <ThreeDot variant="bounce" color="#3171cc" size="medium" text="" textColor="" />
                    </div>
                ) : (
                    <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="username">User Name :</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="enter your username"
                                className="bg-slate-100 px-2 py-1 focus:outline-primary"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password">Password :</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="enter your password"
                                className="bg-slate-100 px-2 py-1 focus:outline-primary"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide"
                        >
                            Login
                        </button>
                    </form>
                )}
                <p className="my-3 text-center">
                    New User?{" "}
                    <Link to={"/register"} className="hover:text-primary font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
