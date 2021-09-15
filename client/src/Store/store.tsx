import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import tasksReducers from "./reducer";

const reducers = combineReducers({
    tasks: tasksReducers
})
export type ReducerType = ReturnType<typeof reducers>
/*export type AppDispatch = typeof store.dispatch*/
export type GetStateType = typeof store.getState
export type RootState = ReturnType<typeof store.getState>

const store = createStore(reducers, applyMiddleware(thunk));

// @ts-ignore
window.store = store

export default store

