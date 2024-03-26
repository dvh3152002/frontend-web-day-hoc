import React, { useEffect, useRef, useState } from "react";
import { Typography, Table, Input, Space, Button, message, Modal } from "antd";
import * as postService from "../../../../apis/service/PostService";
import * as roleService from "../../../../apis/service/RoleService";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../../store/slice/LoadingSlice";
import { SearchOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import moment from "moment";

function ManagePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { confirm } = Modal;
  const [data, setData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [bodyData, setBodyData] = useState({ limit: 10, start: 0 });
  const [update, setUpdate] = useState(false);
  const [rowSelection, setRowSelection] = useState();

  const getListPost = async () => {
    const res = await postService.getListPost(bodyData);
    if (res.success) setData(res.data);
  };

  const deletePost = async (id) => {
    dispatch(setLoading({ isLoading: true }));
    const res = await postService.deletePost(id);
    if (res.success) {
      message.success("Xóa bài viết thành công");
      setUpdate(!update);
    } else message.error("Xóa bài viết thất bại");
    dispatch(setLoading({ isLoading: false }));
  };

  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    getListPost();
    dispatch(setLoading({ isLoading: false }));
  }, []);

  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    getListPost();
    dispatch(setLoading({ isLoading: false }));
  }, [bodyData, update]);

  // Các hàm xử lý sự kiện sắp xếp
  const handleTableChange = (pagination, filters, sorter) => {
    const filteredData = {};
    Object.keys(filters).forEach((key) => {
      if (key === "roles" && filters[key]) {
        filteredData[key] = filters[key].join(",");
      } else {
        const values = Array.isArray(filters[key])
          ? filters[key].join(", ")
          : filters[key];

        filteredData[key] = values;
      }
    });
    setBodyData({
      ...bodyData,
      ...filteredData,
      start: pagination.current - 1,
      limit: pagination.pageSize,
      sortField: sorter.field,
      sortType: sorter.order,
    });
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <div
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleDelete = (record) => {
    confirm({
      title: "Xóa bài viết",
      content: "Bạn có chắc chắn muốn xóa bài viết này",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk() {
        deletePost(record.id);
      },
    });
  };

  const renderAction = (record) => {
    return (
      <div>
        <EyeOutlined
          className="text-3xl text-blue-500 cursor-pointer mr-3"
          onClick={() => {
            navigate(`/admin/post/edit/${record.id}`);
          }}
        />
        <DeleteOutlined
          className="text-3xl text-red-500 cursor-pointer"
          onClick={() => handleDelete(record)}
        />
      </div>
    );
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "1%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: "20%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (description) => (
        <div
          className="mb-5"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      ),
      width: "40%",
    },
    {
      title: "Ngày viết",
      dataIndex: "createDate",
      key: "createDate",
      render: (createDate) => <p>{moment(createDate).format("DD/MM/YYYY")}</p>,
      sortDirections: ["DESC", "ASC"],
    },
    {
      title: "Số lượng code",
      dataIndex: "countCode",
      key: "countCode",
      // render: (createDate) => <p>{moment(createDate).format("DD/MM/YYYY")}</p>,
      sortDirections: ["DESC", "ASC"],
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (text, record) => renderAction(record),
    },
  ];

  return (
    <div className="p-2">
      <Typography.Title className="border-b pb-2">
        Danh sách người dùng
      </Typography.Title>
      <Table
        columns={columns}
        dataSource={data.items}
        pagination={{
          defaultPageSize: bodyData.limit,
          showSizeChanger: true,
          pageSizeOptions: ["10", "25", "50"],
          total: data.total,
        }}
        onChange={handleTableChange} // Xử lý sự kiện sắp xếp
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelection(record.id);
            }, // click row
          };
        }}
      />
    </div>
  );
}

export default ManagePost;
