import React, { useEffect } from "react";
import { Flex, Spin } from "antd";

function LoadingComponent({ children, isLoading }) {
  useEffect(() => {}, [isLoading]);
  return (
    <Flex vertical className="w-full">
      <Spin size="large" spinning={isLoading}>
        {children}
      </Spin>
    </Flex>
  );
}

export default LoadingComponent;
