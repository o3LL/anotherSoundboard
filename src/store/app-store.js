import { createStore, combineReducers } from 'redux';
import config from '../reducers/settings-reducer';

const reducer = combineReducers({
    config,
});

const store = createStore(
    reducer,
    window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true}),
);
export default store;
