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
  ActivityIndicator,
  RefreshControl
} from "react-native";

import ReactNativeListView from "deprecated-react-native-listview";

export default class PegawaiRead extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  static navigationOptions = {
    title: "Daftar Pegawai",
  };


  onRefresh() {
    //Call the Service to get the latest data
    this.getData();
  }

  getData(){
    return fetch(
      "https://mposupj.000webhostapp.com/pegawai/ShowAllStudentsList.php"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ReactNativeListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.setState(
          {
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson),
          },
          function() {
            // In this block you can do something with new state.
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillReceiveProps(val){
    if(val.navigation.state.params.createSucces === true){
      this.getData()
    }
  }

  componentDidMount() {
    this.getData()
  }

  GetStudentIDFunction = (pegawai_id, pegawai_nama, pegawai_gaji) => {
    this.props.navigation.navigate("PegawaiEdit", {
      ID: pegawai_id,
      NAMA: pegawai_nama,
      GAJI: pegawai_gaji,
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
        <ReactNativeListView
          dataSource={this.state.dataSource}
          renderSeparator={this.ReactNativeListViewItemSeparator}
          renderRow={(rowData) => (
            <TouchableOpacity
            style={styles.rowViewContainer}
            onPress={this.GetStudentIDFunction.bind(
              this,
              rowData.pegawai_id,
              rowData.pegawai_nama,
              rowData.pegawai_gaji
            )}>
            <Text style={{textAlign:'center',fontSize:20}}>{rowData.pegawai_nama}</Text>
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
        <TouchableOpacity onPress={() => this.props.navigation.navigate("PegawaiMain")} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
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

  fab: { 
    position: 'absolute', 
    width: 56, 
    height: 56, 
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 20, 
    bottom: 20, 
    backgroundColor: '#03A9F4', 
    borderRadius: 30, 
    elevation: 8 
    }, 
    fabIcon: { 
      fontSize: 40, 
      color: 'white' 
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
    borderRadius:10,
    margin: 10,
    backgroundColor: "white",
    height: 50,
    justifyContent: "center",
    elevation: 5,
  },
});
