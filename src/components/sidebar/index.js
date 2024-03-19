import React, { useEffect } from "react";
import * as CategoryService from "../../apis/service/CategoryService";
import { NavLink } from "react-router-dom";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as categoryAction from "../../store/action/CategoryAction";
import { setLoading } from "../../store/slice/LoadingSlice";

function Sidebar() {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    dispatch(categoryAction.getListCategory());
    dispatch(setLoading({ isLoading: false }));
  }, []);
  return (
    <>
      <div className="flex items-center justify-center bg-red-500 h-10 sm:text-xs xl:text-xl 2xl:text-2xl text-white uppercase">
        <UnorderedListOutlined /> Danh mục
      </div>
      <div className="flex flex-col">
        {categories?.map((item) => {
          return (
            <NavLink
              className="px-5 pt-[10px] pb-[10px]"
              to={`/course/${item.id}`}
              key={item.id}
            >
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </>
  );
}

export default Sidebar;
