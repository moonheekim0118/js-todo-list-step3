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

  toggleTodo: async (teamId, memberId, itemId) => {
    try {
      const result = await memberAPI.toggleTodo(teamId, memberId, itemId);
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  removeTodo: async (teamId, memberId, itemId) => {
    try {
      const result = await memberAPI.removeTodo(teamId, memberId, itemId);
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  removeAllTodo: async (teamId, memberId) => {
    try {
      const result = await memberAPI.removeAllTodo(teamId, memberId);
      return result;
    } catch (error) {
      console.error(error);
    }
  },
};

export default handlers;
