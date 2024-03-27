import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import * as lessonService from "../service/LessonService";
import { setFormData } from "../../utils/helper";

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      return lessonService.deleteLesson(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["lessons"] });
      message.success("Xóa bài học thành công!");
    },
    onError: () => {
      message.error("Xóa bài học không thành công!");
    },
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return lessonService.updateLesson(data?.id, setFormData(data));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["lessons"] });
      message.success("Cập nhật bài học thành công!");
    },
    onError: () => {
      message.error("Cập nhật bài học không thành công!");
    },
  });
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return lessonService.createLesson(setFormData(data));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["lessons"] });
      message.success("Thêm bài học thành công!");
    },
    onError: () => {
      message.error("Thêm bài học không thành công!");
    },
  });
};
