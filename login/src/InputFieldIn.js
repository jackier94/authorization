// This is the component class for the log in input field containts the username and password fields

import React from "react";

// import logo from './logo.svg';

// importing userStore

class InputFieldIn extends React.Component {
  render() {
    return (
      <div className="inputFieldIn">
        <input
          className="input"
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}
        />
      </div>
    );
  }
}

export default InputFieldIn;
