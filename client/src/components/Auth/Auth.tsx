import {
    TouchableOpacity,
    StyleSheet,
    Text,
    TextInput,
    View,
    NativeSyntheticEvent,
    TextInputChangeEventData
} from "react-native";
import React, {useState} from "react";
import {User} from "../../Types/Types";

type Props = {
    signUp(email: string, password: string): void,
    signIn(email: string, password: string): void
};

const Auth:React.FC<Props> = (props) => {
    const [user, setUser] = useState<User>({
        email: '',
        password: ''
    })

    const changeHandler = (type: 'email' | 'password', event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        switch (type) {
            case 'email':
                setUser({...user, email: event.nativeEvent.text})
                break
            case 'password':
                setUser({...user, password: event.nativeEvent.text})
                break
        }
    }

    return (
        <View style={styles.container}>
            <TextInput value={user.email}
                       style={styles.input}
                       placeholder='Enter email'
                       onChange={(event) => changeHandler('email', event)}
                       keyboardType="email-address"
            />
            <TextInput value={user.password}
                       style={styles.input}
                       placeholder='Enter password'
                       onChange={(event) => changeHandler('password', event)}
                       secureTextEntry={true}
                       keyboardType="default"
            />
            <View style={styles.containerBtn}>
                <TouchableOpacity onPress={() => props.signIn(user.email, user.password)} style={styles.btn} >
                    <Text style={styles.text}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.signUp(user.email, user.password)} style={styles.btn}>
                    <Text style={styles.text}>Зарегистрироваться</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default Auth

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        height: '100%',
        width: '85%',
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 10,
    },
    text: {
        fontSize: 20
    },
    input: {
        height: 40,
        borderStyle: "solid",
        borderWidth: 1,
        width: '100%',
        borderColor: '#e2e2e2',
        backgroundColor: '#f6f6f6',
        borderRadius: 4,
        padding: 10,
        marginBottom: 20
    },
    containerBtn: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%'
    }
});