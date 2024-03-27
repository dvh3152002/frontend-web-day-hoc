import React from "react";
import { Editor } from "@tinymce/tinymce-react";

function MarkdownEditor(props) {
  const { value, changeValue } = props;
  return (
    <div>
      <Editor
        initialValue={value}
        apiKey="kvcxjanq3oyrha8hfp3kg4se9rhibk5ezze95jj9x6eivilv"
        init={{
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
        }}
        onChange={(e) => changeValue(e.target.getContent())}
      />
    </div>
  );
}

export default MarkdownEditor;
