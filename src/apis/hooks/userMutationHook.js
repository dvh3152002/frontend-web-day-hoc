import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import * as userService from "../service/UserService";
import { setFormData } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      return userService.deleteUser(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success("Xóa người dùng thành công!");
    },
    onError: () => {
      message.error("Xóa người dùng không thành công!");
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => {
      return userService.updateUser(data?.id, setFormData(data));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success("Cập nhật người dùng thành công!");
      navigate("/admin/user");
    },
    onError: () => {
      message.error("Cập nhật người dùng không thành công!");
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => {
      return userService.createUser(setFormData(data));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success("Thêm người dùng thành công!");
      navigate("/admin/user");
    },
    onError: () => {
      message.error("Thêm người dùng không thành công!");
    },
  });
};
