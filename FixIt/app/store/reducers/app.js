import {APP, APP_STATE} from '../actions/actionTypes';

const initialState = {
  root: null,
  text: null,
  ready: false,
  foreground: null,
  background: false,
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case APP_STATE.FOREGROUND:
      return {
        ...state,
        foreground: true,
        background: false,
      };
    case APP_STATE.BACKGROUND:
      return {
        ...state,
        foreground: false,
        background: true,
      };
    case APP_STATE.START:
      return {
        ...state,
        root: action.root,
        text: action.text,
      };
    case APP_STATE.INIT:
      return {
        ...state,
        ready: false,
      };
    case APP_STATE.READY:
      return {
        ...state,
        ready: true,
      };
    default:
      return state;
  }
}
