import { combineReducers } from 'redux';

import app from './appState';
import user from './user'
import register from './register'
import majors from './majors'

export default combineReducers({
    app,
    user,
    register,
    majors
});
