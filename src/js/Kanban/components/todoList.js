import { SELECTORS } from "../../utils/constants.js";
import { $ } from "../../utils/dom.js";
import { todoListView, addMemberBtnView } from "./view.js";

class todoList {
  constructor(members = []) {
    this.container = $(SELECTORS.TODOLIST_CONTAINER);
    this.members = members;
    this.render();
  }

  update(members) {
    this.members = members;
    this.render();
  }

  render() {
    const memberTodos = this.members.map((member) => todoListView(member));
    memberTodos.push(addMemberBtnView);
    this.container.innerHTML = memberTodos.join("\n");
  }
}

export default todoList;
