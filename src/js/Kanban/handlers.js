import { memberAPI } from "../api/index.js";

const handlers = {
  loadTeam: async (teamId) => {
    try {
      const result = await memberAPI.loadTeam(teamId);
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  addMember: async (teamId, name) => {
    try {
      const result = await memberAPI.addMember(teamId, name);
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  addNewTodo: async (teamId, memberId, contents) => {
    try {
      const result = await memberAPI.addTodo(teamId, memberId, contents);
      return result;
    } catch (error) {
      console.error(error);
    }
  },
};

export default handlers;
