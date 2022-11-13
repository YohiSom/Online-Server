import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Button, Modal, Alert } from "antd";
import { licenseExpired } from "../../store/activeLicense-actions";
import { useDispatch, useSelector } from "react-redux";

function ModalLiveServer({
  text,
  openModalTimer,
  closeModal,
  timer,
  targetDate,
  licenseExpirationDate,
}) {
  const dispatch = useDispatch();
  const licenseDetails = useSelector(
    (state) => state.activeLicense.liveServer || {}
  );
  const messageAlert = useSelector(
    (state) => state.activeLicense.message || {}
  );
  const { open, message, type } = messageAlert || {};
  const { licenceId, _id, serverId } = licenseDetails || {};
  const countDownDate = new Date(licenseExpirationDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date(targetDate).getTime()
  );

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  useEffect(() => {
    if (countDown < 0) {
      dispatch(licenseExpired());
      setOpenModal(true);
    }
  }, [countDown]);

  return (
    <div>
      <Modal title={text} open={openModalTimer} closable={false} footer={null}>
        {open && <Alert message={message} type={type} />}
        {/* {openModal && <Alert message="message" type="error" />} */}

        {!countDown && !open ? (
          <p>Loading Timer...</p>
        ) : (countDown && seconds) > 0 || minutes > 0 ? (
          <p>
            {minutes} : {seconds}
          </p>
        ) : null}
      </Modal>
    </div>
  );
}

export default ModalLiveServer;
