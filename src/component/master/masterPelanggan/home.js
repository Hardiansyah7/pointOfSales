
//This is an example of Tab inside Navigation Drawer in React Native//
import React, { Component } from 'react';
//import react in our code.
// import all basic components

import TabHelper from '../../../navigation/tabnav/tabhelper/TabHelper';

export default class masterPelanggan extends Component {
    //Return Tab Navigator from here to render tab in option one of navigation drawer
    render() {
        return <TabHelper />;
    }
}