import { teamAPI } from "../api/index.js";

const handlers = {
  loadTeamList: async () => {
    try {
      const result = await teamAPI.loadTeamList();
      return result;
    } catch (error) {
      console.error(error);
    }
  },
  addTeam: async (name) => {
    try {
      const result = await teamAPI.addTeam(name);
      return result;
    } catch (error) {
      console.error(error);
    }
  },
};

export default handlers;
