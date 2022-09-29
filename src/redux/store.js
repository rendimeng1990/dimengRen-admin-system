import { legacy_createStore as createStore, combineReducers } from "redux";
import CollapsedReducer from "./reducers/CollapsedReducer";
import LoadingReducer from "./reducers/LoadingReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'dimeng',
    storage,
    blacklist: ['LoadingReducer']
}
const reducer = combineReducers({
    CollapsedReducer,
    LoadingReducer
})
const persistedReducer = persistReducer(persistConfig, reducer)



const store = createStore(persistedReducer)
const persistor = persistStore(store)

export {
    store,
    persistor
}

// store.dispatch()
//store.subscribe()