import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import Output from "./Output";
import { Row, Col } from "antd";

const EditorCode = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="container m-auto">
      <Row className="min-h-screen mt-3">
        <Col span={15} className="mt-[32px]">
          <Editor
            defaultLanguage="java"
            defaultValue={`public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}`}
            value={value}
            onChange={(value) => setValue(value)}
            onMount={onMount}
            height="300px"
            className="border-2 p-2"
          />
        </Col>
        <Col span={1}></Col>
        <Col span={8}>
          <Output editorRef={editorRef} />
        </Col>
      </Row>
    </div>
  );
};

export default EditorCode;
