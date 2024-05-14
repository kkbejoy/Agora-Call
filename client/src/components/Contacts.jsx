import React from "react";

const Contacts = ({ user, videoCallFuc, voiceCallFuc }) => {
  return (
    <div className="my-20 text-center" key={user.email}>
      {user.userName} {user.email}
      <button
        onClick={() => voiceCallFuc(user._id)}
        className="bg-green-500 my-10 mr-4 ml-3 p-3 rounded-md"
      >
        {" "}
        Call
      </button>
      <button
        onClick={() => videoCallFuc(user._id)}
        className="bg-green-700 my-4 p-3 rounded-md"
      >
        {" "}
        Video Call
      </button>
    </div>
  );
};

export default Contacts;
