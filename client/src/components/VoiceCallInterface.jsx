import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { LuPhoneCall } from "react-icons/lu";
import { Button, Modal } from "flowbite-react";

let audioTrack = {
  localAudioTrack: null,
  remoteAudioTrack: {},
};
let clientInstance;
const VoiceCallInterface = () => {
  const [client, setClient] = useState("null");
  const [openModal, setOpenModal] = useState(true);

  const [localStream, setLocalStream] = useState(null);
  const appId = "7d474a4150fe4650ade51da830fe9176";
  const token =
    "007eJxTYLjUm7DNsmDn+cf8tpKp3QFfDFQarec5PzGVnTBHhl2TkVeBwTzFxNwk0cTQ1CAt1cTM1CAxJdXUMCXRwhjItzQ0N/OUcUtrCGRkmKu9jpWRAQJBfG6GDEMwSM3JyWdgAAApZh0a";
  const roomId = "h111111ello";
  const uid = Math.floor(Math.random() * 10000);
  const joinRoom = async () => {
    clientInstance = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    await clientInstance.join(appId, roomId, token, uid);

    clientInstance?.on("user-joined", handleNewJoinie);
    clientInstance.on("user-published", handleUserPublished);
    clientInstance.on("user-left", handleUserLeft);
    audioTrack.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await clientInstance.publish(audioTrack.localAudioTrack);
  };
  const leaveRoom = () => {
    audioTrack.localAudioTrack?.stop();
    audioTrack.localAudioTrack?.close();
    clientInstance.unpublish();
    clientInstance.leave();
  };
  const handleNewJoinie = (user) => {
    console.log("new user joined", user);
    // setClient(user.uid);
  };
  const handleUserPublished = async (user, mediaType) => {
    await clientInstance.subscribe(user, mediaType);
    console.log("user published");
    if (mediaType == "audio") {
      audioTrack.remoteAudioTrack[user.uid] = [user.audioTrack];
      console.log("User audio", user);
      user.audioTrack.play();
    }
  };
  const handleUserLeft = async (user) => {
    delete audioTrack.remoteAudioTrack[user.uid];
  };
  useEffect(() => {
    joinRoom();
    return () => {
      leaveRoom();
      joinRoom();
    };
  });
  return (
    <Modal show={true} onClose={() => setOpenModal(false)}>
      <Modal.Header>Terms of Service</Modal.Header>
      <Modal.Body>
        <div className="">
          <div className="flex justify-center items-center p-4 m-3">
            <h1 className="font-normal  text-4xl text-center text-[50px]">
              Voice Call
            </h1>
          </div>
          <div className="flex -w-full">
            <div className="w-1/2 h-screen">
              <div className="flex justify-center m-auto p-4 ">
                <LuPhoneCall size={"200px"} />
              </div>
            </div>
            <div className="flex w-1/2 items-center align-middle justify-center ">
              <div>
                <h1>{uid}</h1>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  onClick={() => leaveRoom()}
                  className="bg-red-600 text-white p-4 rounded-lg text-wrap text-center m-4 focus:animate-pulse"
                >
                  Leave room
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VoiceCallInterface;
