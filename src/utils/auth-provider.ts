import Client from "@fnndsc/chrisstoreapi";
import axios from "axios";

const localStorageKey = "AUTH_TOKEN";
const USERURL = `${process.env.REACT_APP_API_URL}users/`;
const AUTHURL = `${process.env.REACT_APP_API_URL}`;

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
      token = await Client.getAuthToken(
        process.env.REACT_APP_API_AUTH_URL,
        data.user.username,
        password
      );
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
    client = await new Client(process.env.REACT_APP_API_URL, {
      token,
    });
  }
  return client;
}

export async function cniclient(endpoint: string, data: any, method: string) {
  const config = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method === "get") {
    axios.get(`${AUTHURL}/${endpoint}`).then((response) => {
      console.log(response.data);
    });
  }
}
