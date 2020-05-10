import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Picker,
  ActivityIndicator,
  BackHandler,
} from "react-native";

import { TextInput } from "react-native-paper";

export default class FormCreatePenjualan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInput_Unit: "",
      TextInput_Hrg: "",
      TextInput_Jml: "",
      PickerValuePelanggan: "",
      PickerValueProduk: "",
      isLoading: true,
      dataSourcePelanggan: [],
      dataSourceProduk: [],
    };
  }
  static navigationOptions = {
    title: "Tambah Data Penjualan",
  };

  showToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Success",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    this.props.navigation.navigate("Penjualan", { createSucces: true });
  };

  componentDidMount() {
    this.getDataProduk();
    this.getDataPelanggan();
    BackHandler.addEventListener("hardwareBackPress", this.onBackEvent);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackEvent);
  }

  onBackEvent = () => {
    this.props.navigation.goBack();
    return true;
  };

  getDataProduk() {
    return fetch("https://mposupj.000webhostapp.com/produk/getProduk.php")
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          this.setState(
            {
              isLoading: false,
              dataSourceProduk: responseJson.data,
            },
            function() {
              // In this block you can do something with new state.
            }
          );
        } else {
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getDataPelanggan() {
    return fetch(
      "https://mposupj.000webhostapp.com/pelanggan/ShowAllPelangganList.php"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          this.setState(
            {
              isLoading: false,
              dataSourcePelanggan: responseJson.data,
            },
            function() {
              // In this block you can do something with new state.
            }
          );
        } else {
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  InsertStudentRecordsToServer() {
    fetch("https://mposupj.000webhostapp.com/penjualan/postPenjualan.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_pelanggan: this.state.PickerValuePelanggan,
        id_produk: this.state.PickerValueProduk,
        jumlah_unit: Number(this.state.TextInput_Unit),
        harga_per_unit: Number(this.state.TextInput_Hrg),
        jumlah_jual: Number(this.state.TextInput_Jml),
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
    this.props.navigation.navigate("Penjualan", { createSucces: true });
  };

  cekharga(a) {
    var index = this.state.dataSourceProduk.findIndex(
      (val) => val.id_produk == a
    );
    this.setState(
      {
        TextInput_Hrg: this.state.dataSourceProduk[index].harga_per_unit,
      },
      () => this.sumHarga()
    );
  }

  sumHarga() {
    let calc = this.state.TextInput_Hrg * this.state.TextInput_Unit;
    this.setState({ TextInput_Jml: String(calc) });
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
      <View style={styles.MainContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Text style={styles.titlePicker}>Pelanggan</Text>
          <Picker
            selectedValue={this.state.PickerValuePelanggan}
            style={styles.TextPickerStyleClass}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ PickerValuePelanggan: itemValue })
            }
          >
            <Picker.Item label="select one" value="0" disabled />
            {this.state.dataSourcePelanggan.map((item, key) => (
              <Picker.Item
                label={item.nama_pelanggan}
                value={item.id_pelanggan}
                key={key}
              />
            ))}
          </Picker>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Text style={styles.titlePicker}>Produk</Text>
          <Picker
            // prompt="pilih produk"
            selectedValue={this.state.PickerValueProduk}
            style={styles.TextPickerStyleClass}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ PickerValueProduk: itemValue }, () =>
                this.cekharga(itemValue)
              )
            }
          >
            <Picker.Item label="select one" value="0" disabled />
            {this.state.dataSourceProduk.map((item, key) => (
              <Picker.Item
                label={item.nama_produk}
                value={item.id_produk}
                key={key}
              />
            ))}
          </Picker>
        </View>

        <TextInput
          label="Unit"
          value={this.state.TextInput_Unit}
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Unit: TextInputValue }, () =>
              this.sumHarga()
            )
          }
          style={styles.TextInputStyleClass}
        />

        <TextInput
          label="Harga per Unit"
          value={this.state.TextInput_Hrg}
          keyboardType={"numeric"}
          disabled
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Hrg: TextInputValue })
          }
          style={styles.TextInputStyleClass}
        />

        <TextInput
          label="Jumlah"
          value={this.state.TextInput_Jml}
          keyboardType={"numeric"}
          disabled
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Jml: TextInputValue })
          }
          style={styles.TextInputStyleClass}
        />

        <View style={{ margin: 25 }}>
          <TouchableOpacity
            activeOpacity={0.4}
            style={styles.TouchableOpacityStyle}
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
  titlePicker: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 7,
    width: "40%",
  },
  TextInputStyleClass: {
    width: "90%",
    marginBottom: 5,
    alignSelf: "center",
    backgroundColor: "white",
  },

  TextPickerStyleClass: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 7,
    width: "50%",
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
