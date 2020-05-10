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
import Popup from "../../../assets/popup";

export default class FormEditPemasok extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TextInput_ID: "",
      TextInput_Nama: "",
      TextInput_Alamat: "",
      TextInput_Tlp: "",
      deleteVisible: false,
    };
  }

  componentDidMount() {
    this.getData();
    BackHandler.addEventListener("hardwareBackPress", this.onBackEvent);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackEvent);
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
    this.props.navigation.navigate("Pemasok", { createSucces: true });
  };

  getData() {
    this.setState({
      TextInput_ID: this.props.navigation.state.params.ID,
      TextInput_Nama: this.props.navigation.state.params.NAMA,
      TextInput_Alamat: this.props.navigation.state.params.ALAMAT,
      TextInput_Tlp: this.props.navigation.state.params.TLP,
    });
  }

  static navigationOptions = {
    title: "Detail Data Pemasok",
  };

  deletePopupVisible() {
    this.setState({ deleteVisible: !this.state.deleteVisible });
  }

  UpdateRecord = () => {
    fetch("https://mposupj.000webhostapp.com/pemasok/updatePemasok.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_sup: this.state.TextInput_ID,
        nama_sup: this.state.TextInput_Nama,
        alamat_sup: this.state.TextInput_Alamat,
        no_telepon: this.state.TextInput_Tlp,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server updating records.
        // Alert.alert(responseJson);
        this.showToast();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  DeleteRecord = () => {
    fetch("https://mposupj.000webhostapp.com/pemasok/deletePemasok.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_sup: this.state.TextInput_ID,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.showToast();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        {this.state.deleteVisible && (
          <Popup
            type="delete"
            modalVisible={this.state.deleteVisible}
            onClickClose={() => this.deletePopupVisible()}
            message={"Are You Sure?"}
            onPress={() => this.DeleteRecord()}
          />
        )}

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
          numberOfLines={3}
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 50,
            padding: 10,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.4}
            style={styles.TouchableOpacityStyle}
            onPress={() => this.deletePopupVisible()}
          >
            <Text style={styles.TextStyle}> Delete </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.4}
            style={styles.TouchableOpacityStyle}
            onPress={() => this.UpdateRecord()}
          >
            <Text style={styles.TextStyle}> Save </Text>
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
    marginBottom: 10,
    alignSelf: "center",
    backgroundColor: "white",
  },
  TouchableOpacityStyle: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 7,
    width: "40%",
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
