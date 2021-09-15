import {createSelector} from "reselect";
import {ReducerType} from "./store";

export const getTasks = (state: ReducerType):any[] => {
    return state.tasks.tasks
}

export const getSearch = (state: ReducerType):string => {
    return state.tasks.search
}

export const getTasksActive = createSelector(getTasks, getSearch, (tasks:any[], search:string):any[] => {
    return tasks.filter(task => task.isDone === false && task.value.toLowerCase().indexOf(search.toLowerCase()) >= 0)
})

export const getTasksDone = createSelector(getTasks, getSearch, (tasks:any[], search:string):any[] => {
    return tasks.filter(task => task.isDone === true && task.value.toLowerCase().indexOf(search.toLowerCase()) >= 0)
})

export const getTaskSearch = createSelector(getTasks, getSearch,(tasks:any[], search:string):any[] => {
    return tasks.filter(task => task.value.toLowerCase().indexOf(search.toLowerCase()) >= 0)
})