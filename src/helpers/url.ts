import qs from 'qs';

export const stringifyUrl = function (...params) {
  return qs.stringify(...params);
};

export const parseUrl = (...params) => {
  return qs.parse(...params);
};
