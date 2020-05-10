//This is an example of Tab inside Navigation Drawer in React Native//
import React from 'react';
//import react in our code.
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
//Import all the screens for Tab
import TambahPelanggan from '../../../component/master/masterPelanggan/tambahPelanggan';
import DataPelanggan from '../../../component/master/masterPelanggan/dataPelanggan';

const TabScreen = createMaterialTopTabNavigator(
    {
        "Tambah Pelanggan": { screen: TambahPelanggan },
        "List Data Pelanggan": { screen: DataPelanggan },
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#FFFFFF',
            inactiveTintColor: '#F8F8F8',
            style: {
                backgroundColor: '#4682B4',
            },
            labelStyle: {
                textAlign: 'center',
            },
            indicatorStyle: {
                borderBottomColor: '#87B56A',
                borderBottomWidth: 2,
            },
        },
    }
);
const TabHelper = createStackNavigator({
    TabScreen: {
        screen: TabScreen,
        navigationOptions: () => ({
            title: 'Data Pelanggan',
            // headerLeft:(
            // <Button
            //     onPress={() => this.props.navigation.navigate('Login')}
            //     title="+1"
            //     color="#fff"
            //   />), 
            headerStyle: {
              backgroundColor: '#4682B4',
            },
            headerTintColor: '#fff',
          })
        }
})
export default createAppContainer(TabHelper);