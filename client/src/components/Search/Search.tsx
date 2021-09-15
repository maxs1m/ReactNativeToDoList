import React from 'react'
import {
    Image,
    NativeSyntheticEvent,
    StyleSheet,
    TextInput,
    TextInputChangeEventData,
    TouchableWithoutFeedback,
    View
} from "react-native";

type Props = {
    search: string,
    setSearch(value :string): void
};

const Search:React.FC<Props> = (props) => {

    const clear = ():void => {
        props.setSearch('')
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                       placeholder='Search task for to do'
                       value={props.search}
                       onChange={(event:NativeSyntheticEvent<TextInputChangeEventData>) => props.setSearch(event.nativeEvent.text)}/>
            <TouchableWithoutFeedback onPress={() => clear()}>
                <Image source={require('../../image/cross.png')} style={styles.image_cross}/>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderStyle: "solid",
        borderWidth: 1,
        width: '100%',
        borderColor: '#e2e2e2',
        backgroundColor: '#f6f6f6',
        borderRadius: 4,
        padding: 10
    },
    container: {
        width: '100%',
        position: "relative",
    },
    image_cross: {
        position: "absolute",
        height: 20,
        width: 20,
        right: 10,
        top: 10
    }
});