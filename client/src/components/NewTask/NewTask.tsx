import React, {useState} from 'react'
import {Button, NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputChangeEventData, View} from "react-native";


type Props = {
    saveTask(value :string): void
};

const NewTask:React.FC<Props> = (props) => {

    const [value, setValue] = useState<string>('')

    const addTask = (value: string):void => {
        props.saveTask(value)
        setValue('')
    }

    return (
        <View style={styles.container}>
            <Text>New Task</Text>
            <TextInput style={styles.input}
                       multiline
                       value={value}
                       onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) => setValue(event.nativeEvent.text)}/>
            <View style={styles.btn}>
                <Button title="ADD" onPress={() => addTask(value)}/>
            </View>
        </View>
    )
}

export default NewTask

const styles = StyleSheet.create({
    input: {
        height: 85,
        borderStyle: "solid",
        borderWidth: 1,
        width: '100%',
        borderColor: '#e2e2e2',
        borderRadius: 4,
        padding: 10,
    },
    container: {
        marginTop: 15,
    },
    btn: {
        paddingTop: 5,
        width: '30%',
        alignSelf: "flex-end"
    }
});