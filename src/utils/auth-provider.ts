import Client from "@fnndsc/chrisstoreapi";
import axios from "axios";

const localStorageKey = "AUTH_TOKEN";
const USERURL = `${process.env.REACT_APP_API_URL}users/`;
const AUTHURL = `${process.env.REACT_APP_API_URL}`;
const CNIURL = `${process.env.REACT_APP_CNI_URL}`;

export type Payload = {
  [key: string]: {
    id?: number;
    username: string;
    password: string;
    email?: string;
  };
};

export async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  let data: Payload = {
    user: {
      username: "",
      email: "",
      password: "",
      id: 0,
    },
    error: {
      username: "",
      password: "",
      email: "",
    },
  };
  let token = "";
  try {
    token = await Client.getAuthToken(
      process.env.REACT_APP_API_AUTH_URL,
      username,
      password
    );
    data.user.username = username;
  } catch (error) {
    if (error.response.data.username) {
      data.error.username = error.response.data.username[0];
    }
    if (error.response.data.password) {
      data.error.password = error.response.data.password[0];
    }
  }
  window.localStorage.setItem(localStorageKey, token);
  return data;
}

export async function register({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  let data: Payload = {
    user: {
      username: "",
      email: "",
      password: "",
      id: 0,
    },
    error: {
      username: "",
      password: "",
      email: "",
    },
  };
  let token = "";

  try {
    let payloadData = await Client.createUser(
      USERURL,
      username,
      password,
      email
    );

    data.user = payloadData.data;
    if (data.user.username) {
      token = await Client.getAuthToken(AUTHURL, data.user.username, password);
    }
  } catch (error) {
    if (error.response.data.username) {
      data.error.username = error.response.data.username[0];
    }
    if (error.response.data.email) {
      data.error.email = error.response.data.email[0];
    }

    if (error.response.data.password) {
      data.error.password = error.response.data.password[0];
    }
  }

  window.localStorage.setItem(localStorageKey, token);
  return data;
}

export async function client() {
  const token = window.localStorage.getItem(localStorageKey);
  let client;

  if (token) {
    client = await new Client(AUTHURL, {
      token,
    });
  }
  return client;
}



export async function cniclient(
  endpoint: string,
  method: string,
  auth: {
    username: string;
    password: string;
  }
) {
  console.log("CNIURL", CNIURL, process.env);
  if (method === "get") {
    return axios
      .get(`${CNIURL}${endpoint}`, {
        auth,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        return response.data;
      });
  }
}


