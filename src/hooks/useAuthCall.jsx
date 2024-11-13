import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxios from "./useAxios";
import {
  fetchStart,
  fetchFail,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  passwordUpdateSuccess,
  updateSuccess,
  forgotPasswordTokenSuccess,
} from "../features/authSlice";
import { logoutDataSuccess } from "../features/dataSlice";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosWithToken } = useAxios();

  //* REGISTER FUNCTION
  const register = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/control/admin/create`,
        userData
      );
      dispatch(registerSuccess(data));
      navigate("/dbmain/verification");
    } catch (error) {
      console.log("Error during registration:", error?.response?.data?.message);
      dispatch(fetchFail());
      toast.error(error?.response?.data?.message);
    }
  };

  //* DELETE ADMIN
  const deleteUser = async (userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/control/admin/delete`,
        { data: { userId } }
      );
    } catch (error) {
      dispatch(fetchFail());
      console.error(error);
    }
  };

  //* UPDATE ADMIN PROFILE
  const update = async (userData, userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(
        `${process.env.REACT_APP_API_URL}/control/admin/update/${userId}`,
        userData
      );

      dispatch(updateSuccess(data));

      toast.success("Profile updated successfully");
    } catch (error) {
      dispatch(fetchFail());
      toast.error(error);
    }
  };

  //* VERIFICATION
  const verify = async (userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(
        `${process.env.REACT_APP_API_URL}/control/admin/verify/${userId}`
      );

      dispatch(updateSuccess(data));
      toast.success("Success!");
    } catch (error) {
      dispatch(fetchFail());
      toast.error(error);
    }
  };

  //* LOGIN FUNCTION
  const login = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/control/auth/login/`,
        userData
      );
      if (!data?.result?.verified) {
        deleteUser(data?.result?._id);
        toast.error("No such account found!");
      } else {
        dispatch(loginSuccess(data));
        toast.success("Welcome to the How To Sell!");
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(fetchFail());
      toast.error("Invalid login. Please check your details and try again.");
    }
  };

  //* LOGOUT FUNCTION
  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(
        `${process.env.REACT_APP_API_URL}/control/auth/logout/`
      );
      dispatch(logoutSuccess());
      dispatch(logoutDataSuccess());
      toast.success("Logout successfull");
    } catch (error) {
      dispatch(fetchFail());
      toast.error(error);
    }
  };

  //* DELETE YOU OWN ACCOUNT
  const deleteAccount = async (userId) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(
        `${process.env.REACT_APP_API_URL}/control/admin/delete`,
        { data: { userId } }
      );
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(fetchFail());
      toast.error("User delete failed!");
    }
  };

  //* FORGOT PASSWORD (TO GET EMAIL)
  const forgotPassword = async (email) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/control/admin/forgotpass`,
        email
      );

      dispatch(forgotPasswordTokenSuccess(data));
      toast("Check your email to reset your password.");
    } catch (error) {
      console.log("Error during registration:", error?.response?.data?.message);
      dispatch(fetchFail());
      toast.error(error?.response?.data?.message);
    }
  };

  //* UPDATE FORGOTTEN PASSWORD
  const forgottenPasswordUpdate = async (password, userId) => {
    try {
      const res = await axiosWithToken.put(
        `${process.env.REACT_APP_API_URL}/control/admin/updateforgettenpass/${userId}`,
        { password }
      );
      dispatch(passwordUpdateSuccess(res));
      toast.success("Password Changed Successfully");
    } catch (error) {
      dispatch(fetchFail());
      toast.error("Failed to change password");
    }
  };


  return {
    login,
    register,
    logout,
    forgotPassword,
    deleteUser,
    update,
    forgottenPasswordUpdate,
    verify,
    deleteAccount,
  };
};

export default useAuthCall;
