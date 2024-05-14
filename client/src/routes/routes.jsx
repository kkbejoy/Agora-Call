import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
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
  ],
};
export const appRouter = createBrowserRouter([loginRouter, userRouter]);
