import React, { useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const VoiceCallInterface = () => {
  const [client, setClient] = useState(null);
  const [uid, setUid] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const appId = "7d474a4150fe4650ade51da830fe9176";
  const token =
    "007eJxTYFjx57sUu9FtlqV+3W8dXVgm7Vx7naO7bS2nRKg6l/FS/10KDOYpJuYmiSaGpgZpqSZmpgaJKammhimJFsZAvqWhuVm/i3NaQyAjw84jF5gZGSAQxGdhKEktLmFgAADJ1B3o";

  const join = () => {
    let chanalName = "abcd";
    console.log(AgoraRTC.createClient);
    let clientInstance = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
    // clientInstance.init("6d76263dbe5f40339c641441bb6b7987", () => {
    clientInstance.join(appId, chanalName, token, (uid) => {
      let localStreamInstance = AgoraRTC.createStream({
        streamID: uid,
        audio: true,
        video: false,
        screen: false,
      });
      setLocalStream(localStreamInstance);
      localStreamInstance.init(() => {
        clientInstance.publish(localStreamInstance);
        localStreamInstance.play("local_stream");
      });

      clientInstance.on("stream-added", (evt) => {
        let remoteStream = evt.stream;
        const id = remoteStream.getId();
        client.subscribed(remoteStream);
      });

      clientInstance.on("stream-subscribed", (evt) => {
        let remoteStream = evt.stream;
        remoteStream.play("remote_stream");
      });
    });
    // }
    // );
    setClient(clientInstance);
  };

  return (
    <div>
      VoiceCallInterface
      <button onClick={() => join()}>join call</button>
    </div>
  );
};

export default VoiceCallInterface;
