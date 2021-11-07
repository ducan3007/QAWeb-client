import React, { Fragment, useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPost } from "../../../redux/posts/posts.actions";
import RichTextEditor from "../../../components/RichTextEditor/RichTextEditor.component";
import { useHistory } from "react-router-dom";
import "./AskForm.styles.scss";

const AskForm = ({ addPost }) => {
  let history = useHistory();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tagname: "",
  });

  const richTextEditorRef = useRef(null);

  const { title, body, tagname } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
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
    richTextEditorRef.current.cleanEditorState();
  };

  const updateConvertedContent = (htmlConvertedContent) => {
    setFormData({ ...formData, body: htmlConvertedContent });
  };

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="question-form p16 s-card">
          <div className="question-layout">
            <div className="title-grid">
              <label className="form-label s-label fc-black-800">
                Title
                <p className="title-desc fw-normal fs-caption">
                  Be specific and imagine you’re asking a question to another
                  person.
                  <br />
                  Enter title with minimum 15 characters
                </p>
              </label>
              <input
                className="title-input s-input"
                type="text"
                name="title"
                value={title}
                onChange={(e) => onChange(e)}
                id="title"
                placeholder="e.g. What is NoSQL?"
                required
              />
            </div>
            <div className="body-grid">
              <label className="form-label s-label fc-black-800">
                Body
                <p className="body-desc fw-normal fs-caption fc-black-800">
                  Include all the information someone would need to answer your
                  question.
                  <br />
                  Enter body with minimum 30 characters
                </p>
              </label>
              <div className="s-textarea rich-text-editor-container">

                <RichTextEditor
                  ref={richTextEditorRef}
                  onChange={updateConvertedContent}
                />

              </div>
    
            </div>
            <div className="tag-grid">
              <label className="form-label s-label">
                Tag Name
                <p className="tag-desc fw-normal fs-caption">
                  Add up to 5 tags to describe what your question is about, each
                  seperated by a comma.
                </p>
              </label>
              <input
                className="tag-input s-input"
                type="text"
                name="tagname"
                value={tagname}
                onChange={(e) => onChange(e)}
                id="tagname"
                placeholder="e.g. (java, c++, javascript, nodejs)"
                required
              />
            </div>
          </div>
        </div>
        <div className="post-button mt32">
          <button
            className="s-btn s-btn__primary"
            id="submit-button"
            name="submit-button"
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
