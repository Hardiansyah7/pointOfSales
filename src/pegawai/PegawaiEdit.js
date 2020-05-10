import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Button,
  Text,
  Platform,
  TouchableOpacity,
  ListView,
  ActivityIndicator,
} from "react-native";

import Popup from "../assets/popup";

export default class EditStudentRecordActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TextInput_ID: "",
      TextInput_Nama: "",
      TextInput_Gaji: "",
      deleteVisible: false,
      updateVisible: false,
    };
  }

  componentDidMount() {
    // Received Student Details Sent From Previous Activity and Set Into State.
    this.setState({
      TextInput_ID: this.props.navigation.state.params.ID,
      TextInput_Nama: this.props.navigation.state.params.NAMA,
      TextInput_Gaji: this.props.navigation.state.params.GAJI,
    });
  }

  static navigationOptions = {
    title: "EditStudentRecordActivity",
  };

  popUpVisible = (type) => {
    switch (type) {
      case "delete":
        this.setState({ deleteVisible: !this.state.deleteVisible });
        break;
      case "update":
        this.setState({ updateVisible: !this.state.updateVisible });
        break;
      default:
        break;
    }
  }

  UpdateStudentRecord = () => {
    fetch("https://mposupj.000webhostapp.com/pegawai/UpdateStudentRecord.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pegawai_id: this.state.TextInput_ID,
        pegawai_nama: this.state.TextInput_Nama,
        pegawai_gaji: this.state.TextInput_Gaji,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server updating records.
        // Alert.alert(responseJson);
        this.popUpVisible('update')
      })
      .catch((error) => {
        console.error(error);
      });
  };

  DeleteStudentRecord = () => {
    fetch("https://mposupj.000webhostapp.com/pegawai/DeleteStudentRecord.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pegawai_id: this.state.TextInput_ID,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        // Alert.alert(responseJson);
        this.popUpVisible('update')
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
            onClickClose={() => this.popUpVisible()}
            message={"Are You Sure?"}
            onPress={() => this.DeleteStudentRecord()}
          />
        )}

        {this.state.updateVisible && (
          <Popup
            message={this.state.deleteVisible !== true ? 'Your Data is Updated!' : 'Your Data is Deleted!'}
            modalVisible={this.state.updateVisible}
            onPress={() => this.props.navigation.navigate("PegawaiRead", { createSucces: true })}
          />
        )}

        <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 7 }}>
          {" "}
          Edit Student Record Form{" "}
        </Text>

        <TextInput
          placeholder="Nama Pegawai"
          value={this.state.TextInput_Nama}
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Nama: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />

        <TextInput
          placeholder="Gaji Karyawan"
          value={this.state.TextInput_Gaji}
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Gaji: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={() => this.UpdateStudentRecord()}        >
          <Text style={styles.TextStyle}> UPDATE DATA PEGWAI </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={() => this.popUpVisible('delete')}
        >
          <Text style={styles.TextStyle}> DELETE DATA PEGAWAI </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    alignItems: "center",
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#fff",
  },

  MainContainer_For_Show_StudentList_Activity: {
    flex: 1,
    paddingTop: Platform.OS == "ios" ? 20 : 0,
    marginLeft: 5,
    marginRight: 5,
  },

  TextInputStyleClass: {
    textAlign: "center",
    width: "90%",
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: "#30cb63",
    borderRadius: 5,
  },

  TouchableOpacityStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: "90%",
    backgroundColor: "#30cb63",
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
