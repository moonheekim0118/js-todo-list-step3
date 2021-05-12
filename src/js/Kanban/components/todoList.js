import { SELECTORS } from "../../utils/constants.js";
import { $ } from "../../utils/dom.js";
import { todoListView } from "./view.js";

class todoList {
  constructor(members) {
    this.container = $(SELECTORS.TODOLIST_CONTAINER);
    this.members = members;
    this.render();
  }

  render() {
    const memberTodos = this.members
      .map((member) => todoListView(member))
      .join("\n");
    this.container.innerHTML = memberTodos;
  }
}

export default todoList;
