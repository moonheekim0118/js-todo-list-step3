import { $, getQueryId } from "../utils/dom.js";
import {
  SELECTORS,
  ID_NAMES,
  CLASS_NAMES,
  ALERT_MESSAGE,
} from "../utils/constants.js";
import { memberNameValidator } from "../utils/validators.js";
import teamTitle from "./components/teamTitle.js";
import todoList from "./components/todoList.js";
import handlers from "./handlers.js";

// 불러온 team 정보 sessionStorage에 저장해놓기,
// 만약 이미 있는 정보라면 로딩하지 않기

class Kanban {
  constructor() {
    this.container = $(SELECTORS.TODOLIST_CONTAINER);
    this.teamId = getQueryId();
    this.members = [];
    this.teamName = "";
    this.teamTitleView = new teamTitle(this.teamName);
    this.todoListView = new todoList(this.members);
    this.bindEvents();
    this.init();
  }

  async init() {
    const result = await handlers.loadTeam(this.teamId);
    this.members = result.members;
    this.teamName = result.name;
    this.renderTeamTitle();
    this.renderTodoList();
  }

  bindEvents() {
    this.container.addEventListener("click", ({ target }) => {
      const { classList, id } = target;
      if (
        id === ID_NAMES.ADD_MEMBER_BUTTON ||
        classList.contains(CLASS_NAMES.ADD_MEMBER_BUTTON)
      ) {
        return this.addMemberHandler();
      }
    });
  }

  async addMemberHandler() {
    const memberName = prompt(ALERT_MESSAGE.TYPE_MEMBER_NAME);
    if (!memberName) return;
    if (!memberNameValidator(memberName)) {
      alert(ALERT_MESSAGE.MEMBER_NAME_ALERT);
      return;
    }
    const { members } = await handlers.addMember(this.teamId, memberName);
    this.members = [...this.members, members[members.length - 1]];
    console.log(this.members);
    this.renderTodoList();
  }

  renderTeamTitle() {
    this.teamTitleView.update(this.teamName);
  }

  renderTodoList() {
    this.todoListView.update(this.members);
  }
}

new Kanban();
