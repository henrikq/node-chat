export const defineActions = (base, actions) => {
  const obj = {}
  actions.forEach(action => obj[action] = `${base}/${action}`);
  return Object.freeze(obj);
}

export const HTTP = Object.freeze({
  INIT: {
    pending: false,
    success: false,
    failure: false,
  },
  REQUEST: {
    pending: true,
    success: false,
    failure: false,
  },
  SUCCESS: {
    pending: false,
    success: true,
    failure: false,
  },
  FAILURE: {
    pending: false,
    success: false,
    failure: true,
  }
});



