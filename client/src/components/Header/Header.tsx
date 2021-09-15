import React from 'react'
import {Image, StyleSheet, View} from "react-native";
import SearchContainer from "../Search/SearchContainer";


const Header:React.FC = () => {
    return (
        <View style={styles.header}>
            <Image source={require('../../image/logo.png')} style={styles.image}/>
            <SearchContainer/>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        height: 125,
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 10,
        width: '85%'
    },
    image: {
        width: 174,
        height: 44
    }
});