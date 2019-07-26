import React, { Component } from "react";

class TodoButtons extends Component {
  render () {
    const { finished } = this.props.todo;
    let finishButton;
    if (!finished) {
      finishButton = (
        <button
          type="button"
          className="btn btn-success float-right"
          onClick={this.props.onFinish}
        >
          Dokončiť
        </button>
      )
    }

    return (
      <>
        <button type="button" className="btn btn-light" onClick={this.props.onRemove}>
          Zmazať
        </button>
        {finishButton}
      </>
    );
  }
}

export default TodoButtons;