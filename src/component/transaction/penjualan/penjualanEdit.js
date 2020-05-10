import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  Picker,
  ActivityIndicator,
  TouchableOpacity,
  BackHandler,
} from "react-native";

import { TextInput } from "react-native-paper";
import Popup from "../../../assets/popup";

export default class FormEditPenjualan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TextInput_ID: "",
      TextInput_Unit: "",
      TextInput_Hrg: "",
      TextInput_Jml: "",
      PickerValuePelanggan: "",
      PickerValueProduk: "",
      isLoading: true,
      dataSourcePelanggan: [],
      dataSourceProduk: [],
      deletePopupVisible: false,
    };
  }

  componentDidMount() {
    this.getData();
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

  getData() {
    this.setState({
      TextInput_ID: this.props.navigation.state.params.ID,
      PickerValueProduk: this.props.navigation.state.params.ID_Prod,
      PickerValuePelanggan: this.props.navigation.state.params.ID_Plg,
      TextInput_Unit: this.props.navigation.state.params.Jml_Unit,
      TextInput_Hrg: this.props.navigation.state.params.Hrg_Unit,
      TextInput_Jml: this.props.navigation.state.params.Jml_Jual,
    });
  }

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

  static navigationOptions = {
    title: "Detail Data Penjualan",
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

  deletePopupVisible() {
    this.setState({ deleteVisible: !this.state.deleteVisible });
  }

  UpdateRecord = () => {
    fetch("https://mposupj.000webhostapp.com/penjualan/updatePenjualan.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_penjualan: this.state.TextInput_ID,
        id_pelanggan: this.state.PickerValuePelanggan,
        id_produk: this.state.PickerValueProduk,
        jumlah_unit: Number(this.state.TextInput_Unit),
        harga_per_unit: Number(this.state.TextInput_Hrg),
        jumlah_jual: Number(this.state.TextInput_Jml),
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
    fetch("https://mposupj.000webhostapp.com/penjualan/deletePenjualan.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_penjualan: this.state.TextInput_ID,
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
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
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
  titlePicker: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 7,
    width: "40%",
  },

  TextPickerStyleClass: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 7,
    width: "50%",
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
