import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class AddTodo extends Component {
  state = {
    title: "",
    text: ""
  };

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.onAdd(this.state);
    this.setState({
      title: "",
      text: ""
    });
    this.props.history.push("/");
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    const { title, text } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="form-control mb-2"
          type="text"
          value={title}
          name="title"
          placeholder="Title"
          onChange={this.handleChange}
          required
        />

        <textarea
          className="form-control mb-2"
          value={text}
          name="text"
          placeholder="Text"
          onChange={this.handleChange}
        />

        <button
          type="submit"
          className="btn btn-outline-success"
          disabled={!title}
        >
          Save
        </button>
      </form>
    );
  }
}

export default withRouter(AddTodo);