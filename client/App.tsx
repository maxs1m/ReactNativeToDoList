import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Header from "./src/components/Header/Header";
import {Provider, useDispatch} from "react-redux";
import store from "./src/Store/store";
import {useTypedSelector} from "./src/hooks/useTypedSelector";
import AuthContainer from "./src/components/Auth/AuthContainer";
import {removeUser} from "./src/Store/reducer";
import NewTaskContainer from "./src/components/NewTask/NewTaskContainer";
import TasksContainer from "./src/components/Tasks/TasksContainer";
import FilterContainer from "./src/components/Filter/FilterContainer";

function App() {
    const user = useTypedSelector(state => state.tasks.user.email)
    const dispatch = useDispatch()

    return (<>
        {user?
            <View style={styles.body}>
                <View style={styles.login}>
                    <Text>{user}</Text>
                    <Button title="выйти" onPress={() => dispatch(removeUser())}/>
                </View>
            <Header/>
            <View style={styles.container}>
                <FilterContainer/>
                <NewTaskContainer/>
                <TasksContainer/>
            </View>
        </View>
        : <AuthContainer/>}
    </>);
}

const AppContainer = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

export default AppContainer

export const styles = StyleSheet.create({
    container: {
        width: '85%',
        paddingTop: 10
    },
    body: {
        marginTop: '10%',
        alignItems: "center",
        position: "relative"
    },
    login: {
        position: "relative"
    }
});
