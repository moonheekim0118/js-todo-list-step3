export const $ = (selector, target = document) =>
  target.querySelector(selector);

export const $$ = (selector, target = document) =>
  target.querySelectorAll(selector);

export const getQueryId = () => {
  const params = new URLSearchParams(location.search);
  return params.get("id");
};
