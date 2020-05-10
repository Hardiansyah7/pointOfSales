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
  BackHandler,
} from "react-native";

import ReactNativeListView from "deprecated-react-native-listview";
import Img from "../../../assets/images";

export default class Pemasok extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notFoundVisible: false,
    };
  }

  static navigationOptions = {
    title: "Daftar Pemasok",
  };

  onRefresh() {
    //Call the Service to get the latest data
    this.getData();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackEvent);
  }

  onBackEvent = () => {
    this.props.navigation.goBack();
    return true;
  };

  getData() {
    return fetch("https://mposupj.000webhostapp.com/pemasok/getPemasok.php")
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
    BackHandler.addEventListener("hardwareBackPress", this.onBackEvent);
    this.getData();
  }

  GetStudentIDFunction = (id_sup, nama_sup, alamat_sup, no_telepon) => {
    this.props.navigation.navigate("EditPemasok", {
      ID: id_sup,
      NAMA: nama_sup,
      ALAMAT: alamat_sup,
      TLP: no_telepon,
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
                  rowData.id_sup,
                  rowData.nama_sup,
                  rowData.alamat_sup,
                  rowData.no_telepon
                )}
              >
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  {rowData.nama_sup}
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
          onPress={() => this.props.navigation.navigate("CreatePemasok")}
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
