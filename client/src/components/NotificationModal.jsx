import React from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

const NotificationModal = ({
  status,
  Content,
  acceptFunction,
  rejectdFunction,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <div>
      <Modal
        isOpen={status}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="">
          <h1>{Content}</h1>
          <div className="flex items-center justify-between p-6">
            {" "}
            <button
              onClick={() => acceptFunction()}
              className="bg-green-500 p-3 rounded-lg"
            >
              <h1>Accept</h1>
            </button>
            <button
              onClick={() => rejectdFunction()}
              className="bg-red-500 rounded-lg p-3"
            >
              <h1>Reject</h1>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NotificationModal;
