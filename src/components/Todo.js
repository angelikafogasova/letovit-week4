import React, { Component } from "react";
import TodoButtons from "./TodoButtons";
import axios from "../axios";
import moment from "moment";

class Todo extends Component {
  renderText = () => {
    const { text } = this.props.todo;
    if (!text) return null;

    return (
      <div className="card-text" dangerouslySetInnerHTML={{ __html: text }} />
    );
  };

  handleFinish = async () => {
    await axios.patch("/todos/" + this.props.todo.id, {
      finished: true
    });
    this.props.onFinish();
  };

  handleRemove = async () => {
    await axios.delete("/todos/" + this.props.todo.id);
    this.props.onRemove();
  };

  render() {
    const { createdAt, title, finished, importance } = this.props.todo;
    let classes = "card";
    if (finished) classes += " border-success";

    const then = createdAt;
    const difference = moment().diff(moment(then), "minutes");
    console.log(difference);

    return (
      <div className="todo mb-2">
        <div className={classes}>
          <div className="card-body">
            <h5 className="card-title">
              {title}{" "}
              {difference <= 10 && finished === false ? (
                <span className="badge badge-primary">New</span>
              ) : null}
            </h5>
            <h6 className="card-subtitile text-muted mb-2">
              Created at {moment(createdAt).format("HH:mm DD/MM/YYYY")}
            </h6>

            {this.renderText()}
            <TodoButtons
              todo={this.props.todo}
              onFinish={this.handleFinish}
              onRemove={this.handleRemove}
            />
          </div>
          <div className="card-footer text-muted">
            {importance === "Low" ? <div className="low" /> : null}
            {importance === "Medium" ? <div className="medium" /> : null}
            {importance === "High" ? <div className="high" /> : null}
            {importance === "Urgent" ? <div className="urgent" /> : null}{" "}
            {importance}
          </div>
        </div>
      </div>
    );
  }
}
export default Todo;
