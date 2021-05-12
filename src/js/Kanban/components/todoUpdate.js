import {
  PRIORITY,
  SELECTORS,
  CLASS_NAMES,
  ALERT_MESSAGE,
} from "../../utils/constants.js";
import {
  $,
  getClosestTodo,
  getItemId,
  getClosestTodoItem,
  getMemberId,
} from "../../utils/dom.js";
import { priorityTemplate } from "./view.js";
import handlers from "../handlers.js";

class todoUpdate {
  constructor(container, teamId) {
    this.container = container;
    this.teamId = teamId;
    this.bindEvent();
  }

  bindEvent() {
    this.container.addEventListener("click", ({ target }) => {
      const className = target.className;
      const itemId = getItemId(target);
      const memberId = getMemberId(target);
      const assignAction = {
        [CLASS_NAMES.TOGGLE]: () =>
          this.toggleHandler(target, memberId, itemId),
        [CLASS_NAMES.DESTROY]: () => this.removeTodo(target, memberId, itemId),
        [CLASS_NAMES.CLEAR_ALL]: () => this.removeTodoAll(target, memberId),
        [CLASS_NAMES.PRIORITY_SELECT]: () => {
          const priority = target.value;
          if (priority === PRIORITY.NONE) return;
          this.updatePriorityHandler(target, priority, memberId, itemId);
        },
      };
      assignAction[className] && assignAction[className]();
    });
  }

  async toggleHandler(target, memberId, itemId) {
    const targetTodoItem = getClosestTodoItem(target);
    await handlers.toggleTodo(this.teamId, memberId, itemId);
    targetTodoItem.classList.toggle(CLASS_NAMES.COMPLETED);
  }

  async updateContentsHanlder() {}

  async updatePriorityHandler(target, priority, memberId, itemId) {
    const contents = getClosestTodoItem(target).dataset.contents;
    const labelEl = target.closest(SELECTORS.LABEL);
    labelEl.innerHTML = priorityTemplate[priority] + contents;
    await handlers.updatePriority(this.teamId, memberId, itemId, priority);
  }

  async removeTodo(target, memberId, itemId) {
    const warn = confirm(ALERT_MESSAGE.REMOVE_TODO_ALERT);
    if (!warn) return;
    await handlers.removeTodo(this.teamId, memberId, itemId);
    const targetTodoList = $(SELECTORS.TODO_LIST_MAIN, getClosestTodo(target));
    const children = targetTodoList.children;
    let updatedChild = "";
    for (const node of children) {
      if (node.dataset.item !== itemId) {
        updatedChild += `${node.outerHTML}`;
      }
    }
    targetTodoList.innerHTML = updatedChild;
  }

  async removeTodoAll(target, memberId) {
    const warn = confirm(ALERT_MESSAGE.REMOVE_TODO_ALERT);
    if (!warn) return;
    await handlers.removeAllTodo(this.teamId, memberId);
    const targetTodoList = $(SELECTORS.TODO_LIST_MAIN, getClosestTodo(target));
    targetTodoList.innerHTML = "";
  }
}

export default todoUpdate;
