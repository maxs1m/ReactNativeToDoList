import {
    ActionCreatorTypes,
    ActionTypes, AddTaskAction, AddUserAction,
    ChangeFilterAction, ChangeTaskAction,
    Data, GetTasksAction,
    InitialState,
    RemoveTaskAction, RemoveUserAction, SetSearchAction,
    TaskAction
} from "../Types/Types";
import {taskAPI, userAPI} from "../api/api";
import {Dispatch} from "react";
import {GetStateType, RootState} from "./store";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";

const initialState:InitialState = {
    user: {
        email: '',
        userId: ''
    },
    tasks: [],
    filter: 'All',
    search: ''
}

const tasksReducers = (state = initialState, action:TaskAction):InitialState => {
    switch (action.type) {
        case ActionTypes.GET_TASKS:
            return {...state, tasks: action.data}
        case ActionTypes.CHANGE_FILTER:
            return {...state, filter: action.data}
        case ActionTypes.SET_SEARCH:
            return {...state, search: action.data}
        case ActionTypes.ADD_USER:
            return {...state, user: action.data}
        case ActionTypes.REMOVE_USER:
            return {...state, user: {email: '', userId: ''}}
        case ActionTypes.ADD_TASK:
            return {...state, tasks: [...state.tasks, {...action.data}]}
        case ActionTypes.REMOVE_TASK:
            state.tasks.splice(action.data, 1)
            return {...state, tasks: state.tasks}
        case ActionTypes.CHANGE_TASK:
            return {...state, tasks: state.tasks.map((item, id) => {
                if (id === action.data.id) {
                    item.isDone = action.data.isDone
                    item.isImportant = action.data.isImportant
                }
                return item
            })}
        default:
            return state
    }
}

export default tasksReducers

export const changeFilter = (filter: 'All' | 'Active' | 'Done'):ChangeFilterAction => ({type:ActionTypes.CHANGE_FILTER, data: filter})
export const setSearch = (search: string):SetSearchAction => ({type:ActionTypes.SET_SEARCH, data: search})
export const addUser = (email: string, userId: string):AddUserAction => ({
    type:ActionTypes.ADD_USER,
    data: {email, userId}
})
export const removeUser = ():RemoveUserAction => ({type:ActionTypes.REMOVE_USER})
export const addTasks = (tasks: []):GetTasksAction => ({type:ActionTypes.GET_TASKS, data: tasks})
export const addTask = (owner: string, value: string, isDone: boolean = false, isImportant: boolean = false):AddTaskAction => ({
    type:ActionTypes.ADD_TASK,
    data: {owner, value, isDone, isImportant}
})
export const removeTask = (id: number):RemoveTaskAction => ({type: ActionTypes.REMOVE_TASK, data: id})
export const changeTask = (id: number, isDone: boolean, isImportant: boolean):ChangeTaskAction => ({type: ActionTypes.CHANGE_TASK, data: {id, isDone, isImportant}})

export const signUp = (email: string, password: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch:Dispatch<ActionCreatorTypes>) => {
        let data:Data = await userAPI.signUp(email, password)
        if (!data.errors) {
            dispatch(addUser(email, data.userId!))
        }
    }
}

export const signIn = (email: string, password: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch:Dispatch<ActionCreatorTypes>) => {
        let data:Data = await userAPI.signIn(email, password)
        if (!data.errors) {
            dispatch(addUser(email, data.userId!))
        }
    }
}

export const getTasks = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch:Dispatch<ActionCreatorTypes>, getState: GetStateType) => {
        let owner = getState().tasks.user.userId
        let data:Data = await taskAPI.getTasks(owner)
        if (!data.errors) {
            dispatch(addTasks(data.tasks!))
        }
    }
}

export const saveTask = (value: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch:Dispatch<ActionCreatorTypes>, getState: GetStateType) => {
        let owner = getState().tasks.user.userId
        let data:Data = await taskAPI.addTask(owner, value.toString())
        if (!data.errors) {
            dispatch(addTask(owner, value.toString()))
        }
    }
}

export const deleteTask = (id: number, value: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: Dispatch<ActionCreatorTypes>, getState: GetStateType) => {
        let owner = getState().tasks.user.userId
        let data:Data = await taskAPI.deleteTask(owner, value.toString())
        if (!data.errors) {
            dispatch(removeTask(id))
        }
    }
}

export const updateTask = (id: number, value: string, isDone: boolean, isImportant: boolean): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: Dispatch<ActionCreatorTypes>, getState: GetStateType) => {
        let owner = getState().tasks.user.userId
        let data:Data = await taskAPI.updateTask(owner, value.toString(), isDone, isImportant)
        if (!data.errors) {
            dispatch(changeTask(id, isDone, isImportant))
        }
    }
}




