import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "../auth/login";
import Menu from "../component/menu";
import HomePelanggan from "../component/master/masterPelanggan/home";
// pelanggan
import Pelanggan from "../component/master/pelanggan/pelanggan";
import EditPelanggan from "../component/master/pelanggan/pelangganEdit";
import CreatePelanggan from "../component/master/pelanggan/pelangganCreate";
// pemasok
import Pemasok from "../component/master/pemasok/pemasok";
import CreatePemasok from "../component/master/pemasok/pemasokCreate";
import EditPemasok from "../component/master/pemasok/pemasokEdit";

// produk
import Produk from "../component/master/produk/produk";
import CreateProduk from "../component/master/produk/produkCreate";
import EditProduk from "../component/master/produk/produkEdit";

// penjualan
import Penjualan from "../component/transaction/penjualan/penjualan";
import CreatePenjualan from "../component/transaction/penjualan/penjualanCreate";
import EditPenjualan from "../component/transaction/penjualan/penjualanEdit";

// pembelian
import Pembelian from "../component/transaction/pembelian/pembelian";
import CreatePembelian from "../component/transaction/pembelian/pembelianCreate";
import EditPembelian from "../component/transaction/pembelian/pembelianEdit";

// laporan
import Laporan from "../component/laporan/laporan";

import Splash from "../component/Splash"

import PegawaiMain from "../pegawai/PegawaiMain";
import PegawaiRead from "../pegawai/PegawaiRead";
import PegawaiEdit from "../pegawai/PegawaiEdit";

const RootStack = createStackNavigator(
  {
    PegawaiEdit: {
      screen: PegawaiEdit,
      navigationOptions: {},
    },
    PegawaiMain: {
      screen: PegawaiMain,
      navigationOptions: {},
    },

    PegawaiRead: {
      screen: PegawaiRead,
      navigationOptions: {},
    },

    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },

    Menu: {
      screen: Menu,
      navigationOptions: {
        headerShown: false,
      },
    },

    // HomePelanggan: {
    //   screen: HomePelanggan,
    //   navigationOptions: {
    //     headerShown:false
    //   }
    // },

    //route master pelanggan
    Pelanggan: {
      screen: Pelanggan,
      navigationOptions: {
        headerShown: false,
      },
    },

    EditPelanggan: {
      screen: EditPelanggan,
      navigationOptions: {},
    },

    CreatePelanggan: {
      screen: CreatePelanggan,
      navigationOptions: {},
    },

    // route pemasok
    Pemasok: {
      screen: Pemasok,
      navigationOptions: {
        headerShown: false,
      },
    },

    CreatePemasok: {
      screen: CreatePemasok,
      navigationOptions: {},
    },

    EditPemasok: {
      screen: EditPemasok,
      navigationOptions: {},
    },

    // route produk
    Produk: {
      screen: Produk,
      navigationOptions: {
        headerShown: false,
      },
    },

    CreateProduk: {
      screen: CreateProduk,
      navigationOptions: {},
    },

    EditProduk: {
      screen: EditProduk,
      navigationOptions: {},
    },

    // penjualan
    Penjualan: {
      screen: Penjualan,
      navigationOptions: {
        headerShown: false,
      },
    },

    CreatePenjualan: {
      screen: CreatePenjualan,
      navigationOptions: {},
    },

    EditPenjualan: {
      screen: EditPenjualan,
      navigationOptions: {},
    },

    // pembelian
    Pembelian: {
      screen: Pembelian,
      navigationOptions: {
        headerShown: false,
      },
    },

    CreatePembelian: {
      screen: CreatePembelian,
      navigationOptions: {},
    },
    EditPembelian: {
      screen: EditPembelian,
      navigationOptions: {},
    },

    Laporan: {
      screen: Laporan,
      navigationOptions: {
        headerShown: false,
      },
    },

    Splash: {
      screen: Splash,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    headerMode: "screen",
    initialRouteName: "Splash", // ini root
  }
);

const AppContainer = createAppContainer(RootStack);
export default class AppNavigation extends React.Component {
  render() {
    return <AppContainer />;
  }
}
