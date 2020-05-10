import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  Picker,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from "react-native";

import { TextInput } from "react-native-paper";
import Popup from "../../../assets/popup";

export default class FormEditPembelian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInput_ID: "",
      TextInput_Unit: "",
      TextInput_Potongan: "",
      TextInput_Jml: "",
      TextInput_Hrg: "",
      PickerValuePemasok: "",
      PickerValueProduk: "",
      isLoading: true,
      dataSourcePemasok: [],
      dataSourceProduk: [],
    };
  }

  componentDidMount() {
    this.getDataProduk();
    this.getDataPemasok();
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
    this.props.navigation.navigate("Pembelian", { createSucces: true });
  };

  getData() {
    this.setState({
      TextInput_ID: this.props.navigation.state.params.ID,
      PickerValueProduk: this.props.navigation.state.params.ID_Produk,
      PickerValuePemasok: this.props.navigation.state.params.ID_Sup,
      TextInput_Unit: this.props.navigation.state.params.Jml_Unit,
      TextInput_Potongan: this.props.navigation.state.params.Ptg,
      TextInput_Jml: this.props.navigation.state.params.Jml_Beli,
    });
  }

  getHrgUnit = () => {
    var index = this.state.dataSourceProduk.findIndex(
      (val) => val.id_produk == this.props.navigation.state.params.ID_Produk
    );
    this.setState({
      TextInput_Hrg: this.state.dataSourceProduk[index].harga_per_unit,
      isLoading: false,
    });
  };

  getDataProduk() {
    return fetch("https://mposupj.000webhostapp.com/produk/getProduk.php")
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          this.setState(
            {
              // isLoading: false,
              dataSourceProduk: responseJson.data,
            },
            () => this.getHrgUnit()
          );
        } else {
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getDataPemasok() {
    return fetch("https://mposupj.000webhostapp.com/pemasok/getPemasok.php")
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          this.setState(
            {
              // isLoading: false,
              dataSourcePemasok: responseJson.data,
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
    title: "Detail Data Pembelian",
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

  cekPotongan() {
    let calc = this.state.TextInput_Jml - this.state.TextInput_Potongan;
    this.setState({ TextInput_Jml: String(calc) });
  }
  deletePopupVisible() {
    this.setState({ deleteVisible: !this.state.deleteVisible });
  }

  UpdateRecord = () => {
    fetch("https://mposupj.000webhostapp.com/pembelian/updatePembelian.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_pembelian: this.state.TextInput_ID,
        id_sup: Number(this.state.PickerValuePemasok),
        id_produk: Number(this.state.PickerValueProduk),
        unit: Number(this.state.TextInput_Unit),
        potongan: Number(this.state.TextInput_Potongan),
        jumlah: Number(this.state.TextInput_Jml),
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
    fetch("https://mposupj.000webhostapp.com/pembelian/deletePembelian.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_pembelian: this.state.TextInput_ID,
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
          <Text style={styles.titlePicker}>Pemasok</Text>
          <Picker
            selectedValue={this.state.PickerValuePemasok}
            style={styles.TextPickerStyleClass}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ PickerValuePemasok: itemValue })
            }
          >
            <Picker.Item label="select one" value="0" disabled />
            {this.state.dataSourcePemasok.map((item, key) => (
              <Picker.Item
                label={item.nama_sup}
                value={item.id_sup}
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
          keyboardType={"numeric"}
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TextInput
            label="Potongan"
            value={this.state.TextInput_Potongan}
            keyboardType={"numeric"}
            onChangeText={(TextInputValue) =>
              this.setState({ TextInput_Potongan: TextInputValue })
            }
            style={styles.TextInputStyleClassPotongan}
          />
          <TouchableOpacity
            activeOpacity={0.4}
            style={styles.TouchableOpacityStylePotongan}
            onPress={() => this.cekPotongan()}
          >
            <Text style={styles.TextStyle}>Calc</Text>
          </TouchableOpacity>
        </View>

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
  TouchableOpacityStylePotongan: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 7,
    width: "20%",
    backgroundColor: "#2ED1A2",
  },

  TextInputStyleClassPotongan: {
    width: "60%",
    marginBottom: 5,
    alignSelf: "center",
    backgroundColor: "white",
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
