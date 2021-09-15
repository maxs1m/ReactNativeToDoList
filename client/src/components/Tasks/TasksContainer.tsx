import {connect} from "react-redux";
import Tasks from "./Tasks";
import {getTasksActive, getTasksDone, getTaskSearch} from "../../Store/selectors";
import React from "react";
import {ReducerType} from "../../Store/store";
import {deleteTask, getTasks, updateTask} from "../../Store/reducer";
import {Task} from "../../Types/Types";

type Props = {
    getTasks(): void,
    updateTask(id: number, value: string, isDone: boolean, isImportant: boolean): void,
    deleteTask(id: number, value: string): void,
    filter: 'All' | 'Active' | 'Done',
    tasks: Array<Task>,
    activeTask: Array<Task>,
    doneTask: Array<Task>

};

const FilterTask:React.FC<Props> = (props) => {

    const chooseFilter = (filter: 'All' | 'Active' | 'Done'):Array<Task> => {
        switch (filter) {
            case 'All':
                return props.tasks
            case 'Active':
                return props.activeTask
            case 'Done':
                return props.doneTask
        }
    }

    return (<Tasks updateTask={props.updateTask}
                   deleteTask={props.deleteTask}
                   tasks={chooseFilter(props.filter)}
                   getTasks={props.getTasks}/>

    )
}

const mapStateToProps = (state: ReducerType) => {
    return {
        filter: state.tasks.filter,
        tasks: getTaskSearch(state),
        doneTask: getTasksDone(state),
        activeTask: getTasksActive(state)
    }
}

export default connect(mapStateToProps, {getTasks, updateTask, deleteTask})(FilterTask)