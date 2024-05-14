import axios from "axios";
import { BASE_URL } from "../constants/Constants";
import { userRoutes } from "../constants/Constants";

//Users Login
export const userLogIn = async (email, password) => {
  try {
    const res = await axios.post(`${BASE_URL}${userRoutes.userLogin}`, {
      email,
      password,
    });
    // console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//Users list API

export const getUsersList = async () => {
  try {
    const res = await axios.get(`${BASE_URL}${userRoutes.usersList}`);
    console.log("response from users list", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
