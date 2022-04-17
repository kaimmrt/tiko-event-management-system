import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import authReducer from './reducers/authReducer'
import visitorReducer from './reducers/visitorReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    visitor: visitorReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof rootReducer>;
export default store;