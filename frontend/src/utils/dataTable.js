export const columns = [
  {
    title: "Client_Id",
    dataIndex: "Client_Id",
  },
  {
    title: "License_Key",
    dataIndex: "License_Key",
  },
  {
    title: "License_Expiration",
    dataIndex: "License_Expiration",
  },
  {
    title: "Server_Id",
    dataIndex: "Server_Id",
  },
  {
    title: "Server_Capacity",
    dataIndex: "Server_Capacity",
  },
  {
    title: "Location",
    dataIndex: "Location",
  },
  {
    title: "License_id",
    dataIndex: "License_id",
    hidden: true,
  },
].filter((item) => !item.hidden);
