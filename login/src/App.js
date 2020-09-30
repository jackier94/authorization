import React from "react";
import { observer } from "mobx-react";
// import logo from './logo.svg';

// importing userStore
import UserStore from "./stores/UserStore";
import "./App.css";
// importing log in form / input form / import submit button

import Login from "./Login";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

class App extends React.Component {
  async componentDidMount() {
    try {
      let res = await fetch("/isLoggedIn", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
      let result = await res.json();
      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  // this is the log ouut function

  async doLoggingOut() {
    try {
      let res = await fetch("/logout", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className="app">
          <div className="container">loading, please wait!</div>
        </div>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <div className="app">
            <div className="container">
              Welcome {UserStore.username}
              <SubmitButton
                text={"Log Out"}
                disabled={false}
                //  call back on onClick
                onClick={() => this.doLoggingOut}
              />
            </div>
          </div>
        );
      }
    }
    return (
      <div className="app">
        Log In;
        <div className="container">
          <Login />
        </div>
      </div>
    );
  }
}

export default observer(App);
