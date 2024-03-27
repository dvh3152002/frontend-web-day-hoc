import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import * as postService from "../service/PostService";
import { setFormData } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      return postService.deletePost(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success("Xóa bài viết thành công!");
    },
    onError: () => {
      message.error("Xóa bài viết không thành công!");
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => {
      return postService.updatePost(data?.id, data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success("Cập nhật bài viết thành công!");
      navigate("/admin/post");
    },
    onError: () => {
      message.error("Cập nhật bài viết không thành công!");
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => {
      return postService.createPost(data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success("Thêm bài viết thành công!");
      navigate("/admin/post");
    },
    onError: () => {
      message.error("Thêm bài viết không thành công!");
    },
  });
};
