import React, { memo } from "react";
import { Spin } from "antd";
function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
        background: "rgba(0,0,0,0.5)",
      }}
    >
      <Spin size="large" />
    </div>
  );
}

export default memo(Loading);
