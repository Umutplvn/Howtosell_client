import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxios from "./useAxios";
import {
  fetchStart,
  fetchFail,
  getClientsSuccess,
  getAdminsSuccess,
} from "../features/dataSlice";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosWithToken } = useAxios();

  //* LIST ADMINS
  const listAdmins = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `${process.env.REACT_APP_API_URL}/control/admin/list`
      );
      dispatch(getAdminsSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  //* UPDATE ADMIN PROFILE
  const updateAdmin = async (userData, userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(
        `${process.env.REACT_APP_API_URL}/control/admin/update/${userId}`,
        userData
      );
      listAdmins();
      toast.success("Profile updated successfully");
    } catch (error) {
      dispatch(fetchFail());
      toast.error(error);
    }
  };

  //* LIST CLIENTS
  const listClients = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `${process.env.REACT_APP_API_URL}/user/list`
      );
      dispatch(getClientsSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  //* DELETE A CLIENT
  const deleteClient = async (userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.delete(
        `${process.env.REACT_APP_API_URL}/user/delete`,
        { data: { userId } }
      );
      listClients();
      toast.success("Successfully deleted");
    } catch (error) {
      dispatch(fetchFail());
      console.error(error);
    }
  };

  //* UPDATE A CLIENT
  const updateClient = async (userId, updateData) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(
        `${process.env.REACT_APP_API_URL}/user/update/${userId}`,
        updateData
      );
      listClients();
      toast.success("Successfully updated");
    } catch (error) {
      dispatch(fetchFail());
      toast.error("This email is already taken");
    }
  };

  //! CREATE A CLIENT
  const createClient = async (info) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(
        `${process.env.REACT_APP_API_URL}/user/create`,
        info
      );
      listClients();
      toast.success('Form submitted')
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  return {
    listAdmins,
    updateAdmin,
    listClients,
    deleteClient,
    updateClient,
    createClient,
  };
};

export default useAuthCall;
