import Client from "@fnndsc/chrisstoreapi";
import axios from "axios";

const localStorageKey = "AUTH_TOKEN";
const CNIURL = `${process.env.REACT_APP_CNI_URL}`;
const APIURL = `${process.env.REACT_APP_API_URL}`;
const AUTHURL = `${process.env.REACT_APP_API_AUTH_URL}`;
const USERURL = `${process.env.REACT_APP_API_USER_URL}`;

export type Payload = {
  [key: string]: {
    username: string;
    email: string;
    password: string;
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
  
  let data = {
    auth: {
      username,
      password,
    },
    error: "",
  };
  let token = "";
  try {
    token = await Client.getAuthToken(AUTHURL, username, password);
  } catch (error) {
    data.error = "Invalid username or password";
  }
  if (token){
     data.auth.username = username;
     data.auth.password = password;
     window.localStorage.setItem(localStorageKey, token);
  }
 
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
    },
    error: {
      username: "",
      email: "",
      password: "",
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

    data.user.username = payloadData.data.username;
    data.user.email = payloadData.data.email;
    data.user.password = password;
    token = await Client.getAuthToken(AUTHURL, username, password);
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

export async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

export async function client({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  let client;
  let token = await Client.getAuthToken(AUTHURL, username, password);
  if (token) {
    client = await new Client(APIURL, {
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


