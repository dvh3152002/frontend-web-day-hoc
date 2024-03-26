import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import * as codeService from "../../apis/service/CodeService";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/slice/LoadingSlice";
import { setFormData } from "../../utils/helper";

function Output({ editorRef }) {
  const dispatch = useDispatch();
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const runCode = async (data) => {
    dispatch(setLoading({ isLoading: true }));
    const res = await codeService.runCode(setFormData({ data: data }));
    console.log(res);
    setIsError(!res?.success);
    setOutput(res?.success ? res.data : res.error.message);
    dispatch(setLoading({ isLoading: false }));
  };

  const handleClick = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) {
      message.error("Hãy nhập code");
      return;
    }
    runCode(sourceCode);
  };

  return (
    <div>
      <Button className="bg-green-400 " onClick={handleClick}>
        Run Code
      </Button>
      <div
        className="border-[1px] border-solid border-r-4 border-white-500"
        style={{ height: "300px" }}
      >
        <span className={isError && "text-red-600"}>
          {output ? output : "Bấm Run Code để chạy chương trình"}
        </span>
      </div>
    </div>
  );
}

export default Output;
