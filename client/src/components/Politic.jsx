import React from "react";
import { useSelector } from "react-redux";
import message from "../icons/message.png";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { createComment, fetchComments, deleteComments } from "../features/commentsReducer";
const Politic = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const [text, setText] = useState("");
  const filtered = todos?.filter(
    (item) => item.categoryId === "637e6c8b66aff17b324cfc21"
  );
  const comments = useSelector((state) => state.comments.comments);

  const filteredcomments = comments?.filter(
    (item) => item.categoryId === "637e6c8b66aff17b324cfc21"
  );
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    setText("");
    dispatch(createComment(text, "637e6c8b66aff17b324cfc21"));
    dispatch(fetchComments());
  };
  function deleteTodo(userId, id) {
    dispatch(deleteComments(userId, id));
    dispatch(fetchComments());
  }

  return (
    <>
      {filtered?.map((item, index) => {
        return (
          <div key={item._id}>
            <div className="block-one">
              <div className="image-radius">
                <img src={item.image} alt="" />
                <div className="title-news">{item.title}</div>
              </div>
            </div>
          </div>
        );
      })}
      <div>
        <div className="comments nav-link">
          <img src={message} alt="" />
          <h2>Комментарии:</h2>
        </div>

        <p>
          <textarea
            type="textarea"
            onChange={handleChange}
            value={text}
            className="textarea"
            name="comment"
          ></textarea>
        </p>

        <p>
          <div>
            <button
              onClick={() => handleSubmit()}
              className="button"
              type="button"
            >
              Добавить
            </button>
          </div>
        </p>

        {filteredcomments?.map((item, index) => {
          return (
            <div key={item._id} className="todo">
            <div className="todo-text"> {item.text}</div>
            <div className="actions">
              <button onClick={() => deleteTodo(item.userId, item._id)}>x</button>
            </div>
          </div>
          )
        })}
      </div>
    </>
  );
};

export default Politic;
