import { Button, Form, Input, Typography, message } from "antd";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as userService from "../../../apis/service/UserService";
import { useDispatch } from "react-redux";
import { login } from "../../../store/slice/UserSlice";
import { setLoading } from "../../../store/slice/LoadingSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    dispatch(setLoading({ isLoading: true }));
    const res = await userService.login(data);
    if (res?.success) {
      dispatch(
        login({
          isLoggedIn: true,
          accessToken: res.data.accessToken,
          role: res.data.roles,
        })
      );
      navigate("/");
    } else {
      message.error("Sai thông tin đăng nhập");
    }
    dispatch(setLoading({ isLoading: false }));
  };

  return (
    <div className="container">
      <div className="max-w-lg mx-auto p-4 mt-10 rounded-xl shadow bg-white">
        <div className="flex flex-col items-center">
          {/* <Image src={Logo} alt="iTooth" width={100} height={100} /> */}
          <Typography.Title level={3}>Đăng nhập người dùng</Typography.Title>
        </div>
        <Form
          name="login"
          onFinish={onSubmit}
          autoComplete="on"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email của bạn!",
              },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu của bạn!",
              },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item>
            <span>Bạn chưa có tài khoản? </span>
            <NavLink className="text-blue-500" to="/signup">
              Đăng kí tài khoản
            </NavLink>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <Button
          onClick={() => navigate("/")}
          className="btn bg-blue-500 w-full text-white"
        >
          Về Trang chủ
        </Button>
      </div>
    </div>
  );
}

export default Login;
