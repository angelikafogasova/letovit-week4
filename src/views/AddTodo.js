import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class AddTodo extends Component {
  state = {
    title: "",
    text: "",
    importance: ""
  };

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.onAdd(this.state);
    this.setState({
      title: "",
      text: "",
      importance: ""
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
    const { title, text, importance } = this.state;

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

        <div class="form-group" name="importance">
          <select
            class="form-control"
            id="exampleFormControlSelect1"
            onChange={this.handleChange}
            value={importance}
            name="importance"
          >
            <option value="" selected disabled>
              Please select
            </option>
            <option Value="Low">Low</option>
            <option Value="Medium">Medium</option>
            <option Value="High">High</option>
            <option Value="Urgent">Urgent</option>
          </select>
        </div>

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
