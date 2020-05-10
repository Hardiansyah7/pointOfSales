import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
  BackHandler
} from "react-native";

import ReactNativeListView from "deprecated-react-native-listview";
import Img from "../../../assets/images";

export default class Pembelian extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notFoundVisible: false,
    };
  }

  static navigationOptions = {
    title: "Daftar Penjualan",
  };

  onRefresh() {
    //Call the Service to get the latest data
    this.getData();
  }

  getData() {
    return fetch("https://mposupj.000webhostapp.com/pembelian/getPembelian.php")
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          let ds = new ReactNativeListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
          });
          this.setState(
            {
              isLoading: false,
              dataSource: ds.cloneWithRows(responseJson.data),
            },
            function() {
              // In this block you can do something with new state.
            }
          );
        } else {
          this.setState({ notFoundVisible: true, isLoading: false });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillReceiveProps(val) {
    if (val.navigation.state.params.createSucces === true) {
      this.setState({ isLoading: true, notFoundVisible: false });
      this.getData();
    }
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

  GetStudentIDFunction = (
    id_pembelian,
    id_produk,
    id_sup,
    unit,
    potongan,
    jumlah
  ) => {
    this.props.navigation.navigate("EditPembelian", {
      ID: id_pembelian,
      ID_Produk: id_produk,
      ID_Sup: id_sup,
      Jml_Unit: unit,
      Ptg: potongan,
      Jml_Beli: jumlah,
    });
  };

  ReactNativeListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
        }}
      />
    );
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
      <View style={styles.MainContainer_For_Show_StudentList_Activity}>
        {this.state.notFoundVisible === false ? (
          <ReactNativeListView
            dataSource={this.state.dataSource}
            renderSeparator={this.ReactNativeListViewItemSeparator}
            renderRow={(rowData) => (
              <TouchableOpacity
                style={styles.rowViewContainer}
                onPress={this.GetStudentIDFunction.bind(
                  this,
                  rowData.id_pembelian,
                  rowData.id_produk,
                  rowData.id_sup,
                  rowData.unit,
                  rowData.potongan,
                  rowData.jumlah
                )}
              >
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  {rowData.id_pembelian}
                </Text>
              </TouchableOpacity>
            )}
            refreshControl={
              <RefreshControl
                //refresh control used for the Pull to Refresh
                refreshing={this.state.isLoading}
                onRefresh={() => this.onRefresh()}
              />
            }
          />
        ) : (
          <View style={{ alignSelf: "center", marginTop: 200 }}>
            <Image style={styles.imageFitView} source={Img.searchImg} />
            <Text style={{ textAlign: "center" }}>
              Opsss Data Not Found.....
            </Text>
          </View>
        )}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("CreatePembelian")}
          style={styles.fab}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
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

  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: "white",
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center",
  },

  rowViewContainer: {
    fontSize: 18,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#03A9F4",
    height: 50,
    justifyContent: "center",
    elevation: 5,
  },
  imageFitView: {
    width: 200,
    height: 200,
  },
});
