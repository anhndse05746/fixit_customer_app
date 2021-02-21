const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const defaultTypes = [REQUEST, SUCCESS, FAILURE];

function createRequestType(base, types = defaultTypes) {
  const res = {};
  types.forEach((type) => (res[type] = `${base}_${type}`));
  return res;
}

export const APP_STATE = createRequestType('APP_STATE', [
  'FOREGROUND',
  'BACKGROUND',
]);

export const APP = createRequestType('APP', ['START', 'READY', 'INIT']);
