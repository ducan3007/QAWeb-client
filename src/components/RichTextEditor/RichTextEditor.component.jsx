import React, { useState, forwardRef, useImperativeHandle } from "react";
import RichTextEditor from "react-rte";
import "./RichTextEditor.styles.scss";

const MyStatefulEditor = forwardRef((props, ref) => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());

  useImperativeHandle(ref, () => ({
    cleanEditorState() {
      setValue(RichTextEditor.createEmptyValue());
    },
  }));

  const onChange = (newValue) => {
    setValue(newValue);
    if (props.onChange) {
      props.onChange(newValue.toString("html"));
    }
  };

  const toolbarConfig = {

    display: [
      "INLINE_STYLE_BUTTONS",
      "BLOCK_TYPE_BUTTONS",
    ],
    INLINE_STYLE_BUTTONS: [
      { label: "Bold", style: "BOLD", className: "button-format" },
      { label: "Italic", style: "ITALIC", className: "button-format" },
      { label: "Underline", style: "UNDERLINE", className: "button-format" },
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: "UL", style: "unordered-list-item", className: "button-format" },
      { label: "OL", style: "ordered-list-item", className: "button-format" },
      { label: "Blockquote", style: "blockquote", className: "button-format" },
      {
        label: "Code Block",
        style: "code-block",
        className: "button-format code-block",
      },
    ],
  };
  return (
    <RichTextEditor
      className="rich-text-editor-root"
      toolbarClassName="rich-text-editor-toolbar"
      editorClassName="rich-text-editor-editor"
      toolbarConfig={toolbarConfig}
      value={value}
      onChange={onChange}
    />
  );
});

export default MyStatefulEditor;
