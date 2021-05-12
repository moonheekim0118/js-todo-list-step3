import { SELECTORS, CLASS_NAMES, KEY_NAMES } from "../../utils/constants.js";
import { $, getMemberId, getClosestTodo } from "../../utils/dom.js";
import { todoItemView } from "./view.js";
import handlers from "../handlers.js";

class todoInput {
  constructor(container, teamId) {
    this.container = container;
    this.teamId = teamId;
    this.bindEvent();
  }

  // 쓰로틀링적용하기
  bindEvent() {
    this.container.addEventListener("keydown", ({ key, target }) => {
      if (
        key === KEY_NAMES.ENTER &&
        target.classList.contains(CLASS_NAMES.TODO_INPUT)
      ) {
        return this.submitTodo(target);
      }
    });
  }

  async submitTodo(target) {
    const todoContainer = getClosestTodo(target);
    const memberId = getMemberId(target);
    const newTodoData = await handlers.addNewTodo(
      this.teamId,
      memberId,
      target.value
    );
    target.value = "";
    const newTodo = todoItemView(newTodoData);
    const todoMain = $(SELECTORS.TODO_LIST_MAIN, todoContainer);
    todoMain.innerHTML += newTodo;
  }
}

export default todoInput;
