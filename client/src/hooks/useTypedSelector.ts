import {TypedUseSelectorHook, useSelector} from "react-redux";
import {ReducerType} from "../Store/store";


export const useTypedSelector: TypedUseSelectorHook<ReducerType> = useSelector