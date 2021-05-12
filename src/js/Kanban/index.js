import { getQueryId } from "../utils/dom.js";
import teamTitle from "./components/teamTitle.js";
import todoList from "./components/todoList.js";
import handlers from "./handlers.js";

// 불러온 team 정보 sessionStorage에 저장해놓기,
// 만약 이미 있는 정보라면 로딩하지 않기

class Kanban {
  constructor() {
    this.teamId = getQueryId();
    this.members = [];
    this.teamName = "";
    this.init();
  }

  async init() {
    const result = await handlers.loadTeam(this.teamId);
    this.members = result.members;
    this.teamName = result.name;
    this.render();
  }

  render() {
    const teamTitleView = new teamTitle(this.teamName);
    const todoListView = new todoList(this.members);
    // 여기서 members, teamName 받은걸로
    // components 생성
    // components 내부에서 연산하도록
  }
}

new Kanban();
