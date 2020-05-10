import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import Logo from "./logo";
import Form from "../auth/form";
import { UIActivityIndicator } from "react-native-indicators";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  goTo() {
    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.props.navigation.navigate("Menu");
    }, 1200);
  }
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        {this.state.isLoading && (
          <UIActivityIndicator
            color="white"
            animationDuration={1200}
            size={25}
            style={{ justifyContent: "center", alignItems: "flex-end" }}
          />
        )}

        {this.state.isLoading && (
          <Text style={{ color: "white", fontSize: 15 }}>
            Connecting to Server.....
          </Text>
        )}

        <Form type="Login" route={() => this.goTo()} />

        {/* <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Dont have an account yet?</Text>

          <TouchableOpacity onPress={this.signup}>
            <Text style={styles.signupButton}> Signup</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2196F3",

    flex: 1,
    paddingVertical: 16,
    alignItems: "center",

    justifyContent: "center",
  },

  signupTextCont: {
    flexGrow: 1,

    alignItems: "flex-end",

    justifyContent: "center",

    paddingVertical: 16,

    flexDirection: "row",
  },

  signupText: {
    color: "rgba(255,255,255,0.6)",

    fontSize: 16,
  },

  signupButton: {
    color: "#ffffff",

    fontSize: 16,

    fontWeight: "500",
  },
});
