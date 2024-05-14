import React, { useState } from "react";
import AgoraUIKit from "agora-react-uikit";
import { useNavigate } from "react-router-dom";

const VideoCallInterface = () => {
  const [videoCall, setVideoCall] = useState(true);
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const rtcProps = {
    appId: "7d474a4150fe4650ade51da830fe9176",
    channel: "test",
    token:
      "007eJxTYFjx57sUu9FtlqV+3W8dXVgm7Vx7naO7bS2nRKg6l/FS/10KDOYpJuYmiSaGpgZpqSZmpgaJKammhimJFsZAvqWhuVm/i3NaQyAjw84jF5gZGSAQxGdhKEktLmFgAADJ1B3o",
  };
  const callbacks = {
    EndCall: () => navigate(`/user/profile/${userDetails.name}`),
    // setVideoCall(false),
  };

  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <h3 onClick={() => setVideoCall(true)}>Join</h3>
  );
};

export default VideoCallInterface;
