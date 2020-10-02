import React from "react";
import InputFieldIn from "./InputFieldIn";
import SubmitButton from "./SubmitButton";
import UserStore from "./stores/UserStore";

// importing userStore

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      buttonDisabled: false,
    };
  }
  // pass method SetInputValue
  setInputValue(property, val) {
    val = val.trim();
    // username has a valid lenght of 12 characters but can be changed
    if (val.length > 12) {
      return;
    }
    this.setState({
      [property]: val,
    });
  }

  // use resetForm method---- resets form
  resetForm() {
    this.setState({
      username: "",
      password: "",
      buttonDisabled: false,
    });
  }

  // function for logging in
  async doLoggingIn() {
    // if no username exists then....
    if (!this.state.username) {
      return;
    }
    // if no password exists....
    if (!this.state.password) {
      return;
    }
    this.setState({
      buttonDisabled: true,
    });
    try {
      let res = await fetch("/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });
      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  }
  render() {
    return (
      <div className="login">
        Log In
        <InputFieldIn
          type="text"
          placeholder="Username"
          value={this.state.username ? this.state.username : ""}
          onChange={(val) => this.setInputValue("username", val)}
        />
        <InputFieldIn
          type="password"
          placeholder="Password"
          value={this.state.password ? this.state.password : ""}
          onChange={(val) => this.setInputValue("password", val)}
        />
        <SubmitButton
          text="Login"
          disabled={this.state.buttonDisabled}
          onClick={() => this.doLoggingIn}
        />
      </div>
    );
  }
}

export default Login;
