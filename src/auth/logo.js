import React, { Component } from "react";

import { StyleSheet, Text, View, Image } from "react-native";
import Img from '../assets/images'

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imageFitView}
          source={Img.logoLogin}
        />

        <Text style={styles.logoText}>Welcome to My app.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    justifyContent: "center",
    alignContent:"center",
    alignItems: "center"
  },

  logoText: {
    marginVertical: 15,
    fontSize: 20,
    fontWeight:"bold",
    color:'white'
  },
  imageFitView: {
    width: 200,
    height: 200,
  }
});
