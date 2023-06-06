export const openURL = (URL) => {
  window.open(URL, '_blank', 'noreferrer');
};

export const getAppURL = () => {
  // console.log('current URL 👉️', window.location.href);
  // console.log('current Pathname 👉️', window.location.pathname);
  // console.log(window.location.href.split(window.location.pathname)[0]);
  return window.location.href.split(window.location.pathname)[0];
};

export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};
