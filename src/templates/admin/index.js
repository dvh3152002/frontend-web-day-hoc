import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isAdminLoggedIn } from "../../apis/authentication/AuthenticationService";
import path from "../../utils/path";
import { setLoading } from "../../store/slice/LoadingSlice";
import SidebarAdmin from "../../components/sidebar-admin";
import { Row, Col } from "antd";

function AdminTemplate() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn()) navigate(`/${path.NOT_FOUND}`);
  }, []);
  return (
    <div className="min-h-screen">
      <Row>
        {isAdminLoggedIn() && (
          <>
            <Col span={4}>
              <SidebarAdmin />
            </Col>
            <Col span={20}>
              <Outlet className="min-h-screen" />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
}

export default AdminTemplate;
