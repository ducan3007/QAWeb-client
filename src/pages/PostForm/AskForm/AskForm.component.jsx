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
              <label style={{fontSize:'1.6em'}}>
                Title
              </label>
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
            <label style={{fontSize:'1.6em'}}>
                Body
              </label>
              <div className="s-textarea rich-text-editor-container">

                <RichTextEditor
                  ref={richTextEditorRef}
                  onChange={updateConvertedContent}
                />

              </div>
    
            </div>
            <div className="tag-grid">
            <label style={{fontSize:'1.6em'}}>
                Tags
              </label>
              <p style={{fontSize:'1.15em'}}>You can add up to 6 tags. (tag1,tag2, ... ,tag6) </p>
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
            style={{fontSize:"1.2em",backgroundColor:"#21AFF1",color:"white"}}
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
