import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

type Props = {
    filter: 'All' | 'Active' | 'Done',
    changeFilter(value :'All' | 'Active' | 'Done'): void
};

const Filter:React.FC<Props> = (props) => {

    return (
        <View style={styles.sort}>
            <FilterButton type='All' {...props}/>
            <FilterButton type='Active' {...props}/>
            <FilterButton type='Done' {...props}/>
        </View>
    )
}

type PropsBtn = {
    type: 'All' | 'Active' | 'Done',
    changeFilter(value :'All' | 'Active' | 'Done'): void,
    filter: 'All' | 'Active' | 'Done'
};

const FilterButton:React.FC<PropsBtn> = (props) => {

    const onCLick = (type: 'All' | 'Active' | 'Done') => {
        props.changeFilter(type)
    }

    return (
        <TouchableOpacity style={[styles.sortItem, props.filter === props.type? styles.active:null]} onPress={() => onCLick(props.type)}>
            <Text style={styles.text}>{props.type}</Text>
        </TouchableOpacity>
    )
}

export default Filter

const styles = StyleSheet.create({
    sort: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%'
    },
    sortItem: {
        width: '33%',
        padding: 7,
        alignItems: "center"
    },
    text: {

    },
    active: {
        borderTopColor: '#2F80ED',
        borderTopWidth: 3,
        borderStyle: "solid"
    }
});