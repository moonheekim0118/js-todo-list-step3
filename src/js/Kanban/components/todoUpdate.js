import { CLASS_NAMES } from "../../utils/constants.js";
import {
  $,
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

  async removeTodo(target) {}

  async removeTodoAll() {}
}

export default todoUpdate;
