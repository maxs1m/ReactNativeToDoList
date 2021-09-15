import React, {useEffect} from 'react'
import {View, StyleSheet, Image, Text, Button, TouchableOpacity, TouchableHighlight} from "react-native";
import {Task} from "../../Types/Types";
import {useTypedSelector} from "../../hooks/useTypedSelector";

type Props = {
    tasks: any[],
    getTasks(): void,
    updateTask(id: number, value: string, isDone: boolean, isImportant: boolean):void,
    deleteTask(id: number, value: string):void
};

const Tasks:React.FC<Props> = (props) => {
    const user = useTypedSelector(state => state.tasks.user.email)

    useEffect(() => {
        props.getTasks();
    }, [user, props.tasks])


    const onClick = (id: number, task: Task, type: string) => {
        // eslint-disable-next-line default-case
        switch (type) {
            case 'import':
                props.updateTask(id, task.value, task.isDone, !task.isImportant)
                break
            case 'done':
                props.updateTask(id, task.value, !task.isDone, task.isImportant)
                break
            case 'delete':
                props.deleteTask(id, task.value)
                break
        }
    }

    return (<>
        {props.tasks.map((task: Task, id: number) => <View style={styles.container} key={id}>
            <TouchableOpacity onPress={() => onClick(id, task, 'done')}>
                <View style={styles.task}>
                    <Image source={require('../../image/star.png')} style={[styles.imageStar, task.isImportant? null : styles.hidden]}/>
                    <Text style={[styles.text, task.isDone? styles.lineThrough : null]}>{task.value}</Text>
                    <View style={styles.btn}>
                        <Button title={task.isImportant? 'NOT IMPORTANT':'MARK IMPORTANT'} onPress={() => onClick(id, task, 'import')}/>
                    </View>
                    <TouchableHighlight onPress={() => onClick(id, task, 'delete')}>
                        <Image source={require('../../image/Delete.png')} style={styles.imageDelete}/>
                    </TouchableHighlight>
                </View>
            </TouchableOpacity>
            </View>)
        }
    </>)
}

export default Tasks

const styles = StyleSheet.create({
    container: {
    },
    task: {
        position: "relative",
        backgroundColor: '#ffffff',
        width: '100%',
        minHeight: 105,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        marginTop: 10
    },
    imageStar: {
        position: "absolute",
        top: 5,
        left: -25,
        width: 20,
        height: 20
    },
    imageDelete: {
        position: "absolute",
        top: 35,
        right: 25,
        width: 40,
        height: 40,
    },
    btn: {
        position: "absolute",
        width: '30%',
        top: 5,
        right: 0
    },
    text: {
        width: '70%',
        padding: 5,
    },
    hidden: {
        display: "none"
    },
    lineThrough: {
        textDecorationLine: "line-through"
    }
})