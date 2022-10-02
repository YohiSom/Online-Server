import React from "react";
import "antd/dist/antd.css";
import { Button, Modal } from "antd";

function ModalHandler({ isModalOpen, handleOk, handleCancel, title }) {
  return (
    <div>
      {" "}
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          If you wish to continue with this license, please click OK. Once you
          click OK a timer will run.
        </p>
      </Modal>
    </div>
  );
}

export default ModalHandler;
