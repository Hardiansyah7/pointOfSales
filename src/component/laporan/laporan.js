import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Platform,
  ActivityIndicator,
  Image,
  BackHandler,
} from "react-native";

import Img from "../../assets/images";

export default class Pembelian extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  static navigationOptions = {
    title: "Laporan",
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackEvent);
  }

  onBackEvent = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount() {
    this.setState({ isLoading: false });
    BackHandler.addEventListener("hardwareBackPress", this.onBackEvent);
  }
  
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.MainContainer_For_Show_StudentList_Activity}>
        <View style={{ alignSelf: "center", marginTop: 100 }}>
          <Image style={styles.imageFitView} source={Img.soon} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer_For_Show_StudentList_Activity: {
    flex: 1,
    paddingTop: Platform.OS == "ios" ? 20 : 15,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "white",
  },
  imageFitView: {
    width: 400,
    height: 400,
  },
});
