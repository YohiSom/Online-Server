import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableServer } from "../API/api";
import "antd/dist/antd.css";
import { Table, Alert } from "antd";
import ModalHandler from "../componenets/modal/Modal";
import "./dashBoard.scss";
import { handleActivationLicense } from "../store/activeLicense-actions";
import { columns } from "../utils/dataTable";
import ModalLiveServer from "../componenets/modal/ModalLiveServer";

function DashBoard() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.user || {});
  const { id } = user;
  const location = useSelector((state) => state.user.location);
  //   const id = useSelector((state) => state.user.user.id);
  const liveServerDate = useSelector(
    (state) => state.activeLicense.liveServer || {}
  );
  const licenseData = useSelector(
    (state) => state.activeLicense.licenseDetails
  );
  const messageAlert = useSelector(
    (state) => state.activeLicense.message || {}
  );

  const getLicenseError = useSelector(
    (state) => state.activeLicense.errorMessage || null
  );

  const { open, message, type } = messageAlert || {};
  const [licenses, setLicenses] = useState({});
  const [tableData, setTableData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [licenseRowData, setLicenseRowData] = useState({});
  const [modalTimer, setModalTimer] = useState(false);
  const [error, setError] = useState(false);
  const [availableErrorServer, setAvailableErrorServer] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const { expiration } = licenseData || {};

  function addMinutes(date, minutes) {
    var DateObject = new Date(String(date)),
      modifiedDate = DateObject.getTime() + minutes * 60000;
    return (date = modifiedDate);
  }
  const db = new Date(liveServerDate.time);

  const dbTime = new Date(liveServerDate.time).toLocaleString();

  const newtime = new Date(addMinutes(db, expiration)).toLocaleString();

  const time = new Date();

  const availableServer = async () => {
    setIsLoading(true);
    if (location && id) {
      try {
        setIsLoading(false);
        const res = await getAvailableServer(location, id);

        setLicenses(res);
        setIsLoading(false);
      } catch (err) {
        setAvailableErrorServer(true);

        console.log(err.message);
        setErrorMessage(err.message);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (location) {
      const interval = setInterval(() => {
        availableServer();
      }, 1000 * 3);

      return () => {
        clearInterval(interval);
        setIsLoading(false);
      };
    }
  }, [location]);

  useEffect(() => {
    const data = [];
    if (licenses === undefined) {
      setIsLoading(true);
    }

    if (licenses.licenses) {
      for (let i = 0; i < licenses.licenses.length; i++) {
        data.push({
          key: i + 1,
          Client_Id: `${user.id}`,
          License_Key: `${licenses.licenses[i].key}`,
          License_Expiration: `${licenses.licenses[i].expiration}`,
          Server_Id: `${licenses.serverId}`,
          Server_Capacity: `${licenses.capacity}`,
          Location: `${licenses.location}`,
          License_id: `${licenses.licenses[i]._id}`,
        });
      }
      setIsLoading(false);
      setTableData(data);
    }
  }, [licenses]);

  const handleModal = (r) => {
    setModalOpen(true);
    setLicenseRowData(r);
  };

  const modalClose = () => {
    setModalOpen(false);
  };

  const handleLicense = () => {
    dispatch(
      handleActivationLicense(
        id,
        licenseRowData.License_Key,
        location,
        licenseRowData.Server_Id,
        licenseRowData.License_id,
        time
      )
    )
      .then(setModalOpen(false))
      .then(setModalTimer(true));
  };
  const getLocalStorageLicense = JSON.parse(localStorage.getItem("license"));
  const getLocalStorageLiveServer = JSON.parse(localStorage.getItem("live"));

  useEffect(() => {
    if (getLocalStorageLicense) {
      setModalTimer(true);
    }
  }, []);

  useEffect(() => {
    if (!getLocalStorageLicense) {
      setTimeout(() => {
        setModalTimer(false);
      }, 2000);
    }
  }, [getLocalStorageLicense]);

  //   useEffect(() => {
  //     if (!user.id) {
  //       setError(true);
  //       setIsLoading(false);
  //     }
  //   }, []);

  if (isLoading || location === null) return <div>Is Loading...</div>;

  return (
    <div>
      {getLicenseError && (
        <Alert type={getLicenseError.type} message={getLicenseError.message} />
      )}
      {availableErrorServer && <Alert type="error" message={errorMessage} />}
      {/* {error && <Alert type="error" message="Please log in or register" />} */}
      {licenses && tableData && !availableErrorServer && (
        <Table
          className="hover-row-table"
          onRow={(r) => ({ onClick: () => handleModal(r) })}
          columns={columns}
          dataSource={tableData}
        />
      )}
      <ModalHandler
        isModalOpen={modalOpen}
        handleCancel={modalClose}
        handleOk={handleLicense}
        title={`You chose for license ${licenseRowData.License_Key}. The license will expire in ${licenseRowData.License_Expiration} minutes.`}
      />
      <ModalLiveServer
        targetDate={dbTime}
        licenseExpirationDate={newtime}
        openModalTimer={modalTimer}
        text={
          open
            ? "Disconnected!"
            : getLocalStorageLicense
            ? `You are now live - you have ${getLocalStorageLicense.expiration} minutes to enjoy the server`
            : licenseRowData.License_Expiration
            ? `You are now live - you have ${licenseRowData.License_Expiration} minutes to enjoy the server`
            : "You are LIVE"
        }
      />
    </div>
  );
}

export default DashBoard;
