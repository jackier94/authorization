// This is the component class for the button on the log in form SUBMIT BUTTON COMPONENT

import React from "react";

// import logo from './logo.svg';

// importing userStore

class SubmitButton extends React.Component {
  render() {
    return (
      <div className="submitButton">
        <button
          className="btn"
          disabled={this.props.disabled}
          onClick={() => this.props.onClick()}
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default SubmitButton;
