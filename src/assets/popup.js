import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import Img from "../assets/images";

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.modalVisible,
    };
  }

  render() {
    return this.props.type === "delete" ? (
      <Modal
        animationIn={"shake"}
        isVisible={this.props.modalVisible}
        // onBackButtonPress={() => this.setState({ modal: false })}
        // onBackdropPress={() => this.setState({ modal: false })}
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
              backgroundColor: "brown",
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
              {this.props.message}
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
                backgroundColor: "brown",
                width: 100,
                height: 40,
                justifyContent: "center",
                borderRadius: 10,
                elevation: 10,
              }}
              onPress={this.props.onPress}
            >
              <Text style={{ alignSelf: "center", color: "white" }}>
                Yes, delete it
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: "center",
                backgroundColor: "#e3e3e3",
                width: 100,
                height: 40,
                justifyContent: "center",
                borderRadius: 10,
                elevation: 10,
              }}
              onPress={this.props.onClickClose}
            >
              <Text style={{ alignSelf: "center" }}>No, Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    ) : (
      <Modal
        animationIn={"zoomIn"}
        isVisible={this.props.modalVisible}
        // onBackButtonPress={() => this.setState({ modal: false })}
        // onBackdropPress={() => this.setState({ modal: false })}
      >
        <View
          style={{
            height: 200,
            width: "80%",
            backgroundColor: "white",
            alignSelf: "center",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              justifyContent: "space-evenly",
              flexDirection: "column",
              height: 200,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                color: "black",
                fontWeight: "bold",
              }}
            >
              {this.props.message}
            </Text>
              <Image style={{height:80,width:70, alignSelf:'center'}} source={Img.succesGif} />
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
              onPress={this.props.onPress}
            >
              <Text style={{ alignSelf: "center" }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
