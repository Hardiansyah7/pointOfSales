//This is an example of Tab inside Navigation Drawer in React Native//
import React from 'react';
//import react in our code.
import { Text, View } from 'react-native';
// import all basic components

export default class TabNavScreen1 extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Tambah Data Master Pelanggan</Text>
            </View>
        );
    }
}