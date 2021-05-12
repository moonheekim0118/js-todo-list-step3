import {
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
      const assignAction = {
        [CLASS_NAMES.TOGGLE]: () => this.toggleHandler(target),
        [CLASS_NAMES.DESTROY]: () => this.removeTodo(target),
        [CLASS_NAMES.CLEAR_ALL]: () => this.removeTodoAll(target),
      };
      assignAction[className] && assignAction[className]();
    });
  }

  async toggleHandler(target) {
    const memberId = getMemberId(target);
    const itemId = getItemId(target);
    const targetTodoItem = getClosestTodoItem(target);
    await handlers.toggleTodo(this.teamId, memberId, itemId);
    targetTodoItem.classList.toggle(CLASS_NAMES.COMPLETED);
  }

  async updateContentsHanlder() {}

  async updatePriorityHandler() {}

  async removeTodo(target) {
    const warn = confirm(ALERT_MESSAGE.REMOVE_TODO_ALERT);
    if (!warn) return;
    const memberId = getMemberId(target);
    const itemId = getItemId(target);
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

  async removeTodoAll(target) {
    const warn = confirm(ALERT_MESSAGE.REMOVE_TODO_ALERT);
    if (!warn) return;
    const memberId = getMemberId(target);
    await handlers.removeAllTodo(this.teamId, memberId);
    const targetTodoList = $(SELECTORS.TODO_LIST_MAIN, getClosestTodo(target));
    targetTodoList.innerHTML = "";
  }
}

export default todoUpdate;
