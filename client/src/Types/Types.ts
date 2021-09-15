import {
    addTask,
    addTasks,
    addUser,
    changeFilter,
    changeTask,
    removeTask,
    removeUser,
    setSearch
} from "../Store/reducer";

export interface InitialState {
    user: {
        email: string,
        userId: string
    },
    tasks: Array<Task>;
    filter: 'All' | 'Active' | 'Done';
    search: string
}

export type TaskAction = GetTasksAction |
                        ChangeFilterAction |
                        SetSearchAction |
                        AddUserAction |
                        RemoveUserAction |
                        AddTaskAction |
                        RemoveTaskAction |
                        ChangeTaskAction

export enum ActionTypes {
    GET_TASKS = 'GET_TASKS',
    CHANGE_FILTER = 'CHANGE_FILTER',
    SET_SEARCH = 'SET_SEARCH',
    ADD_USER = 'ADD_USER',
    REMOVE_USER = 'REMOVE_USER',
    ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    CHANGE_TASK = 'CHANGE_TASK',
}

export interface GetTasksAction {
    type: ActionTypes.GET_TASKS,
    data: []
}

export interface ChangeFilterAction {
    type: ActionTypes.CHANGE_FILTER,
    data: 'All' | 'Active' | 'Done'
}

export interface SetSearchAction {
    type: ActionTypes.SET_SEARCH,
    data: string
}

export interface AddUserAction {
    type: ActionTypes.ADD_USER,
    data: {
        email: string,
        userId: string
    }
}

export interface RemoveUserAction {
    type: ActionTypes.REMOVE_USER,
}

export interface AddTaskAction {
    type: ActionTypes.ADD_TASK,
    data: Task
}

export interface RemoveTaskAction {
    type: ActionTypes.REMOVE_TASK,
    data: number
}

export interface ChangeTaskAction {
    type: ActionTypes.CHANGE_TASK,
    data: {
        id: number,
        isDone: boolean,
        isImportant: boolean
    }
}

export interface User {
    email: string,
    password: string
}

export interface Data {
    errors?: string,
    message: string,
    userId?: string,
    tasks?: []
}

export interface Task {
    owner: string,
    value: string,
    isDone: boolean,
    isImportant: boolean
}

export type ActionCreatorTypes = ReturnType<typeof changeFilter |
                                            typeof setSearch |
                                            typeof addUser |
                                            typeof removeUser |
                                            typeof addTasks |
                                            typeof addTask |
                                            typeof removeTask |
                                            typeof changeTask>
