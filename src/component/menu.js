import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  BackHandler
} from "react-native";

import Modal from "react-native-modal";

export default class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  routeScreen = (param) => {
    this.props.navigation.navigate(param);
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackEvent);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackEvent);
  }

  onBackEvent = () => {
    this.setState({ modal: true });
    return true;
  };

  closeApp() {
    BackHandler.exitApp();
  }
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Modal
            isVisible={this.state.modal}
            onBackButtonPress={() => this.setState({ modal: false })}
            onBackdropPress={() => this.setState({ modal: false })}
          >
            <View
              style={{
                height: 200,
                width: "95%",
                backgroundColor: "white",
                alignSelf: "center",
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  height: 75,
                  width: "100%",
                  backgroundColor: "#458cff",
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  justifyContent: "center",
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 16,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Anda yakin ingin keluar aplikasi ini?
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-around",
                  flexDirection: "row",
                  height: 125,
                  paddingHorizontal: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignSelf: "center",
                    backgroundColor: "#e3e3e3",
                    width: 80,
                    height: 30,
                    justifyContent: "center",
                    borderRadius: 10,
                    elevation: 10,
                  }}
                  onPress={() =>
                    this.setState({ modal: false }, () => this.closeApp())
                  }
                >
                  <Text style={{ alignSelf: "center" }}>Keluar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignSelf: "center",
                    backgroundColor: "#e3e3e3",
                    width: 80,
                    height: 30,
                    justifyContent: "center",
                    borderRadius: 10,
                    elevation: 10,
                  }}
                  onPress={() => this.setState({ modal: false })}
                >
                  <Text style={{ alignSelf: "center" }}>Batal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Text style={styles.buttonJudul}>MENU TRANSAKSI</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.routeScreen("Pelanggan")}
          >
            <Text style={styles.buttonText}>Master Pelanggan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.routeScreen("Pemasok")}
          >
            <Text style={styles.buttonText}>Master Pemasok</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.routeScreen("Produk")}
          >
            <Text style={styles.buttonText}>Master Barang</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.routeScreen("Penjualan")}
          >
            <Text style={styles.buttonText}>Transaksi Penjualan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.routeScreen("Pembelian")}
          >
            <Text style={styles.buttonText}>Transaksi Pembelian</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.routeScreen("Laporan")}
          >
            <Text style={styles.buttonText}>Laporan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: 300,
    height: 70,
    backgroundColor: "#1c313a",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 10,
    justifyContent: "center",
  },
  buttonJudul: {
    marginTop: 20,
    marginBottom: 25,
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
});
