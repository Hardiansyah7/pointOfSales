import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  BackHandler,
} from "react-native";

import { TextInput } from "react-native-paper";

export default class FormCreateProduk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInput_Nama: "",
      TextInput_Unit: "",
      TextInput_Hrg: "",
    };
  }
  static navigationOptions = {
    title: "Tambah Data Produk",
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackEvent);
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackEvent);
  }

  onBackEvent = () => {
    this.props.navigation.goBack();
    return true;
  };

  showToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Success",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    this.props.navigation.navigate("Produk", { createSucces: true });
  };

  InsertStudentRecordsToServer() {
    fetch("https://mposupj.000webhostapp.com/produk/postProduk.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama_produk: this.state.TextInput_Nama,
        unit: this.state.TextInput_Unit,
        harga_per_unit: this.state.TextInput_Hrg,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        // alert(responseJson);
        this.showToast();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  GoTo_Show_PelangganList_Activity_Function = () => {
    this.props.navigation.navigate("Produk", { createSucces: true });
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <TextInput
          label="Nama"
          value={this.state.TextInput_Nama}
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Nama: TextInputValue })
          }
          style={styles.TextInputStyleClass}
        />
        <TextInput
          label="Unit"
          value={this.state.TextInput_Unit}
          keyboardType={"numeric"}
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Unit: TextInputValue })
          }
          style={styles.TextInputStyleClass}
        />
        <TextInput
          label="Harga per Unit"
          value={this.state.TextInput_Hrg}
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Hrg: TextInputValue })
          }
          keyboardType={"numeric"}
          style={styles.TextInputStyleClass}
        />

        <View style={{ margin: 25 }}>
          <TouchableOpacity
            activeOpacity={0.4}
            style={styles.TouchableOpacityStyle}
            disabled={!this.state.TextInput_Nama}
            onPress={this.InsertStudentRecordsToServer.bind(this)}
          >
            <Text style={styles.TextStyle}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.4}
            style={styles.TouchableOpacityStyle}
            onPress={this.GoTo_Show_PelangganList_Activity_Function.bind(this)}
          >
            <Text style={styles.TextStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    paddingTop: 10,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "flex-start",
    padding: 5,
  },
  TextInputStyleClass: {
    width: "90%",
    marginBottom: 5,
    alignSelf: "center",
    backgroundColor: "white",
  },

  TextRequired: {
    width: "90%",
    alignSelf: "center",
  },

  TouchableOpacityStyle: {
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 7,
    width: "90%",
    backgroundColor: "#2ED1A2",
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center",
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
