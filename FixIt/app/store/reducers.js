import { combineReducers } from 'redux';

import app from './appState';
import user from './user'

export default combineReducers({
    app,
    user
});
