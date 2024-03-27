import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import * as courseService from "../service/CourseService";
import { setFormData } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      return courseService.deleteCourse(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courses"] });
      message.success("Xóa khóa học thành công!");
    },
    onError: () => {
      message.error("Xóa khóa học không thành công!");
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return courseService.updateCourse(data?.id, setFormData(data));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courses"] });
      message.success("Cập nhật khóa học thành công!");
    },
    onError: () => {
      message.error("Cập nhật khóa học không thành công!");
    },
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return courseService.createCourse(setFormData(data));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courses"] });
      message.success("Thêm khóa học thành công!");
    },
    onError: () => {
      message.error("Thêm khóa học không thành công!");
    },
  });
};
