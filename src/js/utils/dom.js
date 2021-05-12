import { SELECTORS } from "../utils/constants.js";

export const $ = (selector, target = document) =>
  target.querySelector(selector);

export const $$ = (selector, target = document) =>
  target.querySelectorAll(selector);

export const getQueryId = () => {
  const params = new URLSearchParams(location.search);
  return params.get("id");
};

export const getMemberId = (target) =>
  target.closest(SELECTORS.MEMBER_TODO).dataset.member;

export const getClosestTodo = (target) => target.closest(SELECTORS.MEMBER_TODO);
