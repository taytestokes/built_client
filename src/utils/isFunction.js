export const isFunction = (func) => {
  return Object.prototype.toString.call(func) == '[object Function]';
};
