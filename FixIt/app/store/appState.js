import {createSlice} from '@reduxjs/toolkit';

export const ROOT_OUTSIDE = 'outside';
export const ROOT_INSIDE = 'inside';
export const ROOT_LOADING = 'loading';
export const ROOT_BACKGROUND = 'background';

const appState = createSlice({
  name: 'app',
  initialState: {
    root: null,
    text: null,
    ready: false,
    foreground: true,
    background: false,
  },
  reducers: {
    appStateForeground: (app, action) => {
      app.foreground = true;
      app.background = false;
    },
    appStateBackground: (app, action) => {
      app.foreground = false;
      app.background = true;
    },
    appStateStart: (app, action) => {
      app.root = action.payload.root;
      app.text = action.payload.text;
    },
    appStateInit: (app, action) => {
      console.log('appStateInit action: ' + JSON.stringify(action));
      app.ready = false;
    },
    appStateReady: (app, action) => {
      app.ready = true;
    },
  },
});

export default appState.reducer;
export const {
  appStateBackground,
  appStateForeground,
  appStateInit,
  appStateReady,
  appStateStart,
} = appState.actions;
