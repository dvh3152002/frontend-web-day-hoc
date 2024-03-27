import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import * as userService from "../service/UserService";
import { setFormData } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slice/UserSlice";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (data) => {
      return userService.login(data);
    },
    onSuccess: async (user) => {
      const data = user.data;
      dispatch(
        login({
          isLoggedIn: true,
          accessToken: data.accessToken,
          role: data.roles,
        })
      );
      navigate("/");
    },
    onError: () => {
      message.error("Đăng nhập thất bại!");
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => {
      return userService.register({
        ...data,
        roles: [2],
      });
    },
    onSuccess: async () => {
      message.success("Đăng kí tài khoản thành công");
      navigate("/login");
    },
    onError: () => {
      message.success("Đăng kí tài khoản thất bại");
    },
  });
};
