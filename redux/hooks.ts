// Se importan los hooks de redux con nombres diferentes de los de react.
import {type TypedUseSelectorHook, useSelector as useReduxSelector, useDispatch as useReduxDispatch} from "react-redux";
import {type store} from "./store";

// Se le asignas los tipos de ReduxDispatch y de ReduxState.
// Es importante que de apartir de ahora siempre se importen de aca.
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export type ReduxDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;
export type ReduxState = ReturnType<typeof store.getState>;
