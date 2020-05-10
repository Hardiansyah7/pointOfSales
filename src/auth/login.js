import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from "react-native";

import Logo from './logo';
import Form from "../auth/form";

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Logo />

        <Form type='Login'
            route={() => this.props.navigation.navigate("Menu")}
        />

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

    justifyContent: "center"
  },

  signupTextCont: {
    flexGrow: 1,

    alignItems: "flex-end",

    justifyContent: "center",

    paddingVertical: 16,

    flexDirection: "row"
  },

  signupText: {
    color: "rgba(255,255,255,0.6)",

    fontSize: 16
  },

  signupButton: {
    color: "#ffffff",

    fontSize: 16,

    fontWeight: "500"
  }
});
