import { $ } from "../utils/dom.js";
import {
  SELECTORS,
  ID_NAMES,
  CLASS_NAMES,
  ALERT_MESSAGE,
} from "../utils/constants.js";
import { teamNameValidator } from "../utils/validators.js";
import handlers from "./handlers.js";
import teamListView from "./view.js";

class Team {
  constructor() {
    this.container = $(SELECTORS.TEAM_LIST_CONTAINER);
    this.teamList = [];
    this.bindEvents();
    this.init();
  }

  async init() {
    this.teamList = await handlers.loadTeamList();
    this.render();
  }

  bindEvents() {
    this.container.addEventListener("click", ({ target }) => {
      if (
        target.id === ID_NAMES.ADD_TEAM_BUTTON ||
        target.classList.contains(CLASS_NAMES.ADD_TEAM_BUTTON)
      ) {
        return this.addTeamHandler();
      }
    });
  }

  async addTeamHandler() {
    const teamName = prompt(ALERT_MESSAGE.TYPE_TEAM_NAME);
    if (!teamName) return;
    if (!teamNameValidator(teamName)) {
      alert(ALERT_MESSAGE.TEAM_NAME_ALERT);
      return;
    }
    const newTeam = await handlers.addTeam(teamName);
    this.teamList = [...this.teamList, newTeam];
    this.render();
    return;
  }

  render() {
    this.container.innerHTML = teamListView(this.teamList);
  }
}

new Team();
