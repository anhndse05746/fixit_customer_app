import { combineReducers } from 'redux';

import app from './appState';
import user from './user'
import register from './register'
import resetPassword from './resetPassword'

export default combineReducers({
    app,
    user,
    register,
    resetPassword
});
