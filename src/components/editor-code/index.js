import React, { useState } from "react";
import AceEditor from "react-ace";

// Import các ngôn ngữ và theme bạn muốn sử dụng
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const EditorCode = () => {
  const [code, setCode] = useState("");

  const onChange = (newCode) => {
    setCode(newCode);
  };

  return (
    <>
      <AceEditor
        mode="java" // Cấu hình ngôn ngữ
        theme="monokai" // Cấu hình theme
        onChange={onChange} // Xử lý sự kiện thay đổi nội dung
        name="UNIQUE_ID_OF_DIV" // Tên duy nhất của div
        editorProps={{ $blockScrolling: true }}
        value={`public class Main {
        public static void main(String[] args) {
          if (20 > 18) {
            System.out.println("20 is greater than 18"); // obviously
          }
        }
      }`} // Nội dung hiện tại của trình soạn thảo
        fontSize={14} // Kích thước font
        width="100%" // Chiều rộng
        height="500px" // Chiều cao
      />
    </>
  );
};

export default EditorCode;
