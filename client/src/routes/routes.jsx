import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import VideoCallInterface from "../components/VideoCallInterface";
import VoiceCallInterface from "../components/VoiceCallInterface";
const loginRouter = {
  path: "/",
  element: <LoginPage />,
};
const userRouter = {
  path: "/user",
  children: [
    {
      path: "profile/:id",
      element: <ProfilePage />,
    },
    {
      path: "call/:id",
      element: <VideoCallInterface />,
    },
    {
      path: "voice/:id",
      element: <VoiceCallInterface />,
    },
  ],
};
export const appRouter = createBrowserRouter([loginRouter, userRouter]);
