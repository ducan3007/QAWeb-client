import React, { Fragment, useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SunEditor, { buttonList } from "suneditor-react";

import "suneditor/dist/css/suneditor.min.css";

import { addPost, uploadFilehandler } from "../../../redux/posts/posts.actions";
import RichTextEditor from "../../../components/RichTextEditor/RichTextEditor.component";
import "./AskForm.styles.scss";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const AskForm = ({ addPost }) => {
  let history = useHistory();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tagname: "",
  });

  const richTextEditorRef = useRef(null);

  const editorRef = useRef(null);

  const getEditorInstance = (instance) => {
    editorRef.current = instance;
  };

  const { title, body, tagname } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const body = editorRef.current.getContents();

    addPost({ title, body, tagname }, (err, result) => {
      if (!err) {
        history.push(`/questions/${result.data}`);
      }
    });

    setFormData({
      title: "",
      body: "",
      tagname: "",
    });
  };

  const updateConvertedContent = (htmlConvertedContent) => {
    setFormData({ ...formData, body: htmlConvertedContent });
  };

  const preUploadImage = (files, info, response) => {
    uploadFilehandler(files[0])
      .then((res) => {
        response({
          result: [
            {
              url: res?.data?.data?.url,
              name: res?.data?.data?.key,
            },
          ],
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-unused-expressions
        editorRef.current?.noticeOpen();
        response("");
      });
  };

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="question-form p16 s-card">
          <div className="question-layout">
            <div className="title-grid">
              <label style={{ fontSize: "1.6em" }}>Title</label>
              <input
                className="title-input s-input"
                type="text"
                name="title"
                value={title}
                onChange={(e) => onChange(e)}
                id="title"
                placeholder="e.g. What is .....?"
                required
              />
            </div>
            <div className="body-grid">
              <label style={{ fontSize: "1.6em" }}>Body</label>

              <div className="s-textarea rich-text-editor-container">
                {/* <RichTextEditor
                  ref={richTextEditorRef}
                  onChange={updateConvertedContent}
                /> */}

                <SunEditor
                  width="100%"
                  height="100%"
                  setAllPlugins={true}
                  placeholder={"Write your question here..."}
                  setOptions={{
                    minHeight: "350px",
                    maxHeight: "80vh",
                    buttonList: buttonList.complex,
                    charCounter: true,
                    charCounterType: "char",
                    charCounterLabel: `Maximum (10000 characters): `,
                    defaultStyle: "font-family:Arial, Helvetica, sans-serif;",
                  }}
                  onImageUploadBefore={preUploadImage}
                  // onImageUpload={EditorEvents.onImageUpload}
                  getSunEditorInstance={getEditorInstance}
                />
              </div>
            </div>
            <div className="tag-grid">
              <label style={{ fontSize: "1.6em" }}>Tags</label>
              <p style={{ fontSize: "1.15em" }}>
                You can add up to 6 tags. (tag1,tag2, ... ,tag6){" "}
              </p>
              <input
                className="tag-input s-input"
                type="text"
                name="tagname"
                value={tagname}
                onChange={(e) => onChange(e)}
                id="tagname"
                placeholder="Tags are separated by commas."
                required
              />
            </div>
          </div>
        </div>

        <div className="post-button mt32">
          <button
            className="s-btn"
            id="submit-button"
            name="submit-button"
            style={{ fontSize: "1.2em", backgroundColor: "#21AFF1", color: "white" }}
          >
            Post your question
          </button>
        </div>
      </form>
    </Fragment>
  );
};

AskForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(AskForm);
