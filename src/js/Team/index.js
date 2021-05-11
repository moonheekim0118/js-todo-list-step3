import { teamAPI } from "../api/index.js";
import { $ } from "../utils/dom.js";
import { SELECTORS } from "../utils/constants.js";
import teamListView from "./view.js";

class Team {
  constructor() {
    this.container = $(SELECTORS.TEAM_LIST_CONTAINER);
    this.teamList = [];
    this.bindEvents();
    this.init();
  }

  async init() {
    this.teamList = await this.loadTeamList();
    this.render();
  }

  bindEvents() {
    // 이벤트 바인딩해주기
  }

  async loadTeamList() {
    try {
      const result = await teamAPI.loadTeamList();
      return result;
    } catch (error) {}
  }

  async addTeam() {
    try {
    } catch (error) {}
  }

  async removeTeam() {
    try {
    } catch (error) {}
  }

  render() {
    this.container.innerHTML = teamListView(this.teamList);
  }
}

export default Team;
