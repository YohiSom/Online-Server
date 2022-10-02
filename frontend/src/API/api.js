const baseUrl = "http://localhost:5000/api";

const registerApi = async (name, password) => {
  const res = await fetch(`${baseUrl}/login/register`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ name, password }),
  });

  if (res) {
    const data = await res.json();

    if (res.ok == false) {
      throw Error(data.message);
    }

    return data;
  }
};
const LoginApi = async (name, password) => {
  const res = await fetch(`${baseUrl}/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ name, password }),
  });

  if (res) {
    const data = await res.json();

    if (res.ok == false) {
      throw Error(data.message);
    }

    return data;
  }
};

const getLocation = async () => {
  const res = await fetch("https://ipapi.co/json/");

  if (res) {
    const data = await res.json();
    return data.country_name;
  } else {
    throw Error({
      message:
        "Your location cannot be established at the moment! Please try again later!",
    });
  }
};

const getAvailableServer = async (location, id) => {
  const res = await fetch(`${baseUrl}/available`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ location, id }),
  });

  if (res) {
    const data = await res.json();

    if (res.ok == false) {
      throw Error(data.message);
    }

    return data;
  }
};

const activateLicense = async (
  id,
  License_Key,
  location,
  Server_Id,
  License_id,
  time
) => {
  const res = await fetch(`${baseUrl}/activeLicense`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      id,
      License_Key,
      location,
      Server_Id,
      License_id,
      time,
    }),
  });

  if (res) {
    const data = await res.json();

    if (res.ok == false) {
      throw Error(data.message);
    }

    return data;
  }
};

const stopLicense = async (licenceId, _id, serverId) => {
  const res = await fetch(`${baseUrl}/removeLiveServer`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      licenceId,
      _id,
      serverId,
    }),
  });

  if (res) {
    const data = await res.json();

    if (res.ok == false) {
      throw Error(data.message);
    }

    return data;
  }
};

export {
  registerApi,
  LoginApi,
  getLocation,
  getAvailableServer,
  activateLicense,
  stopLicense,
};
