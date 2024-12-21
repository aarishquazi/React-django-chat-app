import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
// import Home from "../pages/Home";
import AuthLayouts from "../layouts";
import MessagePage from "../Components/MessagePage";
import Login from "../pages/Login.js"
import ChatroomList from "../Components/ChatroomList.js";
import ProfilePage from "../Components/ProfilePage.js";
import HomePage from "../Components/HomePage.js";
import Profileview from "../Components/Profileview.js";


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "/",
                element : <HomePage />
            },
            {
                path : "register",
                element : <AuthLayouts><RegisterPage route="/register/"  /></AuthLayouts>
            },
           
            {
                path : 'login',
                element : <AuthLayouts><Login route="auth/token/" /></AuthLayouts>
            },
            {
                path : "chatroom",
                element : <ChatroomList route= 'rooms/'/>
                
            }, 
            {
                path : 'chatroom/room/:roomname',
                element : <MessagePage route='room/${roomname}/messages/'/>
            },
            {
                path : 'profile',
                element: <ProfilePage />
            },
            {
                path : 'profile/:username',
                element : <Profileview route='profile/${username}' />
            }
        ]
        }
    ])
    
    export default router