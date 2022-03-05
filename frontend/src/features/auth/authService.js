import axios from "axios";

const API_URL = "/api/users/";

// register user
const register = async (userData) => {
  const resp = await axios.post(API_URL, userData);

  if (resp.data) {
    localStorage.setItem("user", JSON.stringify(resp.data));
  }

  return resp.data;
};

// login user
const login = async (userData) => {
  const resp = await axios.post(API_URL + "login", userData);

  if (resp.data) {
    localStorage.setItem("user", JSON.stringify(resp.data));
  }

  return resp.data;
};

// logout
const logout = async () => {
  localStorage.removeItem("user");
};

const authService = { register, logout, login };

export default authService;
