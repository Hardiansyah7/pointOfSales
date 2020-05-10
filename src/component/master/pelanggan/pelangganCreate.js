import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  BackHandler,
} from "react-native";

import { TextInput, HelperText } from "react-native-paper";
import Popup from "../../../assets/popup";

export default class FormCreatePelanggan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInput_Nama: "",
      TextInput_Alamat: "",
      TextInput_Tlp: "",
    };
  }
  static navigationOptions = {
    title: "Tambah Data Pelanggan",
  };

  showToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Success",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    this.props.navigation.navigate("Pelanggan", { createSucces: true });
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

  InsertStudentRecordsToServer() {
    fetch(
      "https://mposupj.000webhostapp.com/pelanggan/InsertPelangganData.php",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama_pelanggan: this.state.TextInput_Nama,
          alamat_pelanggan: this.state.TextInput_Alamat,
          no_tlp_pelanggan: this.state.TextInput_Tlp,
        }),
      }
    )
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
    this.props.navigation.navigate("Pelanggan", { createSucces: true });
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
          label="Alamat"
          multiline={true}
          scrollEnabled
          value={this.state.TextInput_Alamat}
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Alamat: TextInputValue })
          }
          style={styles.TextInputStyleClass}
        />
        <TextInput
          label="Nomor Telepon"
          value={this.state.TextInput_Tlp}
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Tlp: TextInputValue })
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
