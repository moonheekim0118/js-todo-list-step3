import { memberAPI } from "../api/index.js";

const handlers = {
  loadTeam: async (teamId) => {
    try {
      const result = await memberAPI.loadTeam(teamId);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  },
};

export default handlers;
