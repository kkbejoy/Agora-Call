import React, { useEffect, useState } from "react";
// import VideoCallInterface from "../components/login/VideoCallInterface";
import { io } from "socket.io-client";
import { BASE_URL } from "../constants/Constants";
import { getUsersList } from "../api/userAPI";
import { useSelector, useDispatch } from "react-redux";
import { getUserListAsync } from "../slices/usersSlice";
import Contacts from "../components/Contacts";
import NotificationModal from "../components/NotificationModal";

let socket;
const ProfilePage = () => {
  const [usersList, setUsersLIst] = useState({});
  const [voiceCallComing, setvoiceCallComing] = useState(false);
  const [videoCallComing, setvideoCallComing] = useState(false);
  const [callDetails, setCallDetails] = useState("");
  const dispatch = useDispatch();
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const users = useSelector((state) => state.usersList);

  useEffect(() => {
    socket = io("ws://localhost:5000");
    socket.emit("setup", userDetails);
    // socket.emit("userJoined", userId);
    // socket.emit("userJoined", userId);
    socket.on("userJoined", (userDetails) => {
      console.log("user joined");
    });
    socket?.on("IncomingVoiceCall", (callDetails) => {
      setCallDetails(`Incoming Voice call from ${callDetails.name}`);
      setvoiceCallComing(true);
      console.log("Incoming Voice Call From:", callDetails);
    });
  });

  //Create a video call request
  const makeVideoCall = async () => {
    try {
      console.log("Make video callS");
      setvideoCallComing(true);
    } catch (error) {
      console.log(error);
    }
  };

  //Create a voice call request
  const makeVoiceCall = async (value) => {
    try {
      const callDetails = {
        name: userDetails.name,
        from: userDetails._id,
        to: value,
      };
      socket.emit("voiceCall", callDetails);
    } catch (error) {
      console.log(error);
    }
  };

  //Accept  Video call

  const acceptVideoCall = async () => {
    try {
      console.log("call accepted");
    } catch (error) {
      console.log(error);
    }
  };

  //Accept  Voice call
  const acceptVoiceCall = async () => {
    try {
      console.log("Voice call accepted");
    } catch (error) {
      console.log(error);
    }
  };

  //Reject Call
  const rejectCall = async () => {
    try {
      console.log("Call rejected");
      setvoiceCallComing(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(getUserListAsync());
    socket.emit("chatRoom", userDetails);

    // console.log("Use effect");
    // socket.on("connection", (message) => {
    //   console.log("connection", message);
    // });
    // socket.emit("videoCall", "hello");
  }, []);
  return (
    <div>
      <NotificationModal
        status={voiceCallComing}
        Content={callDetails}
        acceptFunction={acceptVoiceCall}
        rejectdFunction={rejectCall}
      />
      <h1 className="my-20 text-center font-bold text-4xl">Users list</h1>
      <div>
        {users?.usersList?.map((user) => {
          return (
            <Contacts
              key={user.email}
              user={user}
              videoCallFuc={makeVideoCall}
              voiceCallFuc={makeVoiceCall}
            />
          );
        })}
      </div>
      <>{/* <VideoCallInterface /> */}</>
    </div>
  );
};

export default ProfilePage;
